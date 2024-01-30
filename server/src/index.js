require("dotenv").config()
const express=require("express");
const cors=require("cors");
const morgan=require("morgan")
const mongoose=require("mongoose")
const userRoutes=require("./routes/userRoutes")
const pool=require("./sql_database/db")

const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'))

const PORT=process.env.PORT | 4000;

app.use("/user",userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to DB");
    app.listen(PORT,()=>{
        console.log("server is running on port 4000")
    })

})