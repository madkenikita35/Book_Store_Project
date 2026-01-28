import express from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";


const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['Get', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to the MERN Project");
});

app.use("/books", booksRoutes);

mongoose
    .connect(MONGODBURL)
    .then(() =>{
        console.log(`App Connected to the database`);
        app.listen(PORT, () => {
            console.log(`Server is running on  Port no. ${PORT}`);
});
    })
    .catch((error) =>{
        console.log(error);
    })