import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_PATH,
    credentials: true
}));

const options = {method: 'GET', headers: {authorization: `Bearer ${process.env.CLOVER_SK}`}};

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

        // Fetch the filtered url
        const apires = await fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MID}/items?filter=available=${availability}&filter=price>=${price_start}&filter=price<=${price_end}&expand=categories`, options);
        const data = await apires.json();
        const items = data.elements || [];

        // Define the return array
        let ret_arr = [];

        // Safeguard categories_filter
        if (categories_filter === undefined || categories_filter === "all") {
            ret_arr = items;
        } else {
            // Filter each item by its categories => elements[0] => name to the categories_filter
            ret_arr = items.filter(item => item.categories.elements[0].name === categories_filter);
        }

        res.json({ message: "final return array", ret_arr });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching filtered items.");
    }
});

// Api route to dynamically fetch individual products from inventory
// TODO: FIX THIS!!
app.get('/inventory/:id', async(req, res) => {
    try {
        const { id } = req.query;

        const apires = await fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MID}/items?filter=id=${id}&expand=categories`, options);
        const item = await apires.json();

        res.json({message: "fetched item", item});
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching individual item.");
    }
});

// TO-DO: Create a backend pagination function

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 3000.'));