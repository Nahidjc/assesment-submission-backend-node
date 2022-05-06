const mongoose = require("mongoose");

const assesmentSubmissionSchema = mongoose.Schema({


    link: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    assesment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assesment",
    },
    grade: {
        type: String,
        default: "Not yet graded"
    },
    date_of_submission: {
        type: Date,
        required: true,
        default: Date.now
    },



}, { timestamps: true, });


module.exports = mongoose.model("AssesmentSubmission", assesmentSubmissionSchema)