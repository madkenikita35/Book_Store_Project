import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.auther ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:"Send All required Feilds: title, auhter, publishYear",
            });
        }
        const newBook = {
            title : req.body.title,
            auther : req.body.auther,
            publishYear : req.body.publishYear,

        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get("/", async (req, res) =>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count : books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message});
    }
});

router.get("/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message});
    }
});

// app.get("/books/:title", async (req, res) =>{
//     try {
//         const {title} = req.params;
//         const book = await Book.find({ title: title });
//         return res.status(200).json(book);
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({message: error.message});
//     }
// });
router.get("/search/:title", async (req, res) => {
    try {
        const { title } = req.params;

        // Pass an object specifying the field name
        const books = await Book.find({ title: title });

        // If no books are found, it returns an empty array []
        if (books.length === 0) {
            return res.status(404).json({ message: "No books found with that title" });
        }

        return res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.auther ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message :  "Send all required Feild :Title, Auther, PublishedYear"
                 
            })
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message : "Book not Found"});
        }
         return res.status(200).send({message: "Book Updated Successfully"});

        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message : error.message
        });
    }
});

router.delete("/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).send({message: 'Book deleted Successfully'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
});

export default router;