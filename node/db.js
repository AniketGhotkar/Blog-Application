const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
    await mongoose.connect(process.env.Mongodb_url);
    console.log("MongoDB Connected Successfully");
}

module.exports = connectDB;