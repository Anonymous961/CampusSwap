require("dotenv").config()
const express=require("express");
const cors=require("cors");
const morgan=require("morgan")

const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'))

const PORT=process.env.PORT | 4000;

app.listen(PORT,()=>{
    console.log("server is running on port 4000")
})