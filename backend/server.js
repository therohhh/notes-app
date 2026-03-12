const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Note = require("./models/Note");

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});

app.get("/",(req,res)=>{
    res.send("Notes API is running.....")
});

app.post("/notes",async(req, res)=>{
    try{
        const {title,content} = req.body;
        const note = new Note({
            title,
            content
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
});
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put("/notes/:id", async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        res.json(updatedNote);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});