const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
