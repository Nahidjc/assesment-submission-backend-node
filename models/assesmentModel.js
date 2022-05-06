const mongoose = require("mongoose");

const assesmentSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true,

    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    deadline_at: {
        type: Date,
        required: true,
        
    }


}, { timestamps: true, });


module.exports = mongoose.model("Assesment", assesmentSchema)