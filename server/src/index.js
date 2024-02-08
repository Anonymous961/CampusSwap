require("dotenv").config({path:'../.env'});
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const { connectSQL } = require("./sql_database/neonSeq");
const User=require("./models/user.sql")

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

const PORT = process.env.PORT | 5000;

app.use("/api/user", userRoutes);

const startServer = async () => {
  try {
    // console.log(PORT);
    await connectSQL(); // Connect to SQL database
    await User.sync({ alter: true }); // Synchronize User table
    console.log("user table sync")

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected");
    app.listen(PORT, () => {
      console.log("server is running on port ", PORT);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};
startServer();
