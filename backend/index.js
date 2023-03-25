require('dotenv').config();
var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    connection = require("./db"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    taskschema = require("./model/createtask");


//Routes
const createtask = require("./routes/createtask");

const PORT = 5000;

connection();

app.use(express.json());
app.use(cors());
app.use("/", createtask);

app.listen(process.env.PORT || PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server is listning on port 5000");
    }
})