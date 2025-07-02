import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_PATH,
    credentials: true
}));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'sadboiz'
}).promise();

const options = {method: 'GET', headers: {authorization: `Bearer ${process.env.CLOVER_SK}`}};

{/* SECTION 1: INVENTORY */}

app.get('/get-inventory', (req, res) => {
    fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MID}/items?expand=categories`, options)
        .then(apires => apires.json())
        .then(data => res.json(data.elements))
        .catch(err => console.error(err));
});

app.get('/inventory', async (req, res) => {
    try {
        // Get all filter parameters from search query
        const { categories_filter, price_start_filter, price_end_filter, available_filter } = req.query;
        
        // Safeguard all the filters in case they are undefined
        const availability = available_filter !== undefined ? available_filter : true;
        const price_start = price_start_filter !== undefined ? price_start_filter : 0;
        const price_end = price_end_filter !== undefined ? price_end_filter : 99990000; // Update end_filter to stable val

        const categories = categories_filter !== undefined ? categories_filter : "all";

        // Fetch the filtered url
        const apires = await fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MID}/items?filter=available=${availability}&filter=price>=${price_start}&filter=price<=${price_end}&expand=categories`, options);
        const data = await apires.json();
        const items = data.elements || [];

        // Define the return array
        let ret_arr = [];

        // Safeguard categories_filter
        if (categories === "all") {
            ret_arr = items;
        } else {
            // Filter each item by its categories => elements[0] => name to the categories_filter
            ret_arr = items.filter(item => item.categories.elements[0].name === categories);
        }

        res.json({ message: "final return array", ret_arr });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching filtered items.");
    }
});

// Api route to dynamically fetch individual products from inventory
app.get('/inventory/:id', async(req, res) => {
    try {
        // Grabs the id from the request params
        const { id } = req.params;

        // Get the api response from clover while filtering by id
        const apires = await fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MID}/items/${id}?&expand=categories`, options);
        const item = await apires.json(); // Get the item by converting response into json format

        // Database querying and retrieving product's supplementary components (image_url, description)
        const query = `SELECT * FROM product WHERE clover_id = ?`;
        const [dbData] = await pool.query(query, [id]);

        // Convert outgoing response into json format with components item (clover response) and content (db response)
        res.json({
            item: item,
            content: dbData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching individual item.");
    }
});

// TO-DO: Create a backend pagination function

{/* SECTION 2: USER REGISTRATION & AUTHENTICATION */}

// JSON parsing middleware!
app.use(express.json());

app.post("/register", async(req, res) => {
    // Pull all input data from body
    const { first_name, last_name, email, phone_number, plain_pw } = req.body;
    const saltRounds = 10; // Initialize number of salt rounds for bcrypt

    try {
        // Generate the salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Convert plain password to hashed password using generated salt
        const hashed_pw = await bcrypt.hash(plain_pw, salt);

        // INSERT INTO query to register new user into the database
        const insert_query = `INSERT INTO users(first_name, last_name, hashed_pw, email, phone) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(insert_query, [first_name, last_name, hashed_pw, email, phone_number]);

        // FOR DEBUGGING PURPOSES ONLY!
        const [new_user] = await pool.query(`SELECT first_name, last_name, email, phone FROM users WHERE email = ?`, [email]);

        res.status(201).json({
            message: "User created successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while creating user." });
    }
});

app.post("/login", async(req, res) => {
    try {
        // Pull email and plain_pw data from req.body
        const { email, plain_pw } = req.body;

        // Create the search_query for user
        const search_query = `SELECT * FROM users WHERE email = ?`;

        // Grab the resulting row
        const [result] = await pool.query(search_query, [email]);

        // TEST ONE: Is user even being pulled in correctly from pool?
        // console.log("result:", result);

        // If there is no result (404)
        if (result.length === 0) {
            res.status(404).json({ message: "User does not exist. "});
        }

        const user = result[0];

        // Grab the hashed_pw from database
        const result_password = user.hashed_pw;
        
        // TEST TWO: Is hashed password being retrieved properly?
        // console.log("Retrieved password:", result_password);

        // Check the password using bcrypt.compare()
        const password_check = await bcrypt.compare(plain_pw, result_password);

        // TEST THREE: Is plain_pw === hashed_pw?
        // console.log("is plain_pw === hashed_pw??", password_check);

        // This test helped me realize that promise<pending> means that await is needed prior

        // If passwords align, log user in and set success status (200)
        if (password_check === true) {
            const roles = Object.values(user.roles).filter(Boolean);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": user.id,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1h'}
            );
            
            const refreshToken = jwt.sign(
                {"id": user.id},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            )

            user.refreshToken = refreshToken;

            const result = await user.save();

            const update_query = `UPDATE users SET refreshToken = ? WHERE email = ?`;
            await pool.query(update_query, [refreshToken, email]);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.status(200).json({ message: "Successfully logged in!", roles, accessToken });
        } else {
            // Else, send status (401)
            res.status(401).json({ message: "Incorrect password." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while retrieving user." });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 3000.'));