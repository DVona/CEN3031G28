const express = require("express");
const dotenv = require("dotenv");
const { users } = require("./data/data.js");
const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// API functions
/*

// Provides all data (users) in the data.js file
app.get("/api/users", (req,res) => {
  res.send(users);
});

*/

// Launch Server
app.listen(PORT, console.log("Server Started on Port", PORT));
