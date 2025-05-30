const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const { connectMongoDB } = require("./Connections");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/backend");

//Midleware - Plugin
//For Every request this plugin will work
// this plugin basically pull the data from postman and created json object and put on request.body
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("hello fgffrom middleware 1 ");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("hello from middleware 1 ");
//   return res.end("hey fdsfdsadfsfads");
// });

//Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
