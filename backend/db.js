const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connection = () => {
    mongoose.connect(process.env.MONGOURL, {
        useNewUrlParser: true,
    })
        .then(() => { console.log("Database is connected"); })
        .catch((err) => { console.log(err); })
};

module.exports = connection;
