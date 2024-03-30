require("dotenv").config({path:'../.env'});
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const { connectSQL } = require("./sql_database/neonSeq");
const User=require("./models/user.sql")
const path=require("path");
const {createServer}=require('http')
const {setupSocket}=require("./socket/socketManager")

const app = express();

const server=createServer(app);
const io=setupSocket(server);

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname,"public")));
app.use(express.static("public"));
// app.use(morgan("combined"));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

const PORT = process.env.MYPORT | 4000;

app.use("/api/item", itemRoutes);
app.use("/api/user", userRoutes);

const startServer = async () => {
  try {
    await connectSQL(); // Connect to SQL database
    // await User.sync({ alter: true }); // Synchronize User table
    console.log("user table sync")

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected");
    server.listen(PORT, () => {
      console.log("server is running on port ", PORT);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};
startServer();
