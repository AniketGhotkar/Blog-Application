const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, trim: true, minLength: 5, maxLength: 30 , lowercase: true,unique: true},
    password: {type:String, required: true},
    age: {type: Number, min:18}
});

const User = mongoose.model("User", userSchema);

module.exports = User;

