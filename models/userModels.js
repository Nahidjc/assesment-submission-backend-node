const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true,
        trim: true,
    },
    userName: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "student",
    },


}, { timestamps: true, });


module.exports = mongoose.model("User",userSchema)