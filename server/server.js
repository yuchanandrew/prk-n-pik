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


// TO-DO: Develop a dynamic item filtering function

// app.get(`/filter-inventory/${options.data.elements.}`, (req, res) => {

// })

// TO-DO: Create a backend pagination function

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 3000.'));