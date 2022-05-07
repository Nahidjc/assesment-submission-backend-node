const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/userModels")
const Assesment = require("../models/assesmentModel")
const AssesmentSubmission = require("../models/submissionAssesmentModel")
const jwt = require("jsonwebtoken");


const assesmentControllers = {
  createAssesment: async (req, res) => {
    try {
      const { title, description, mentor, deadline_at } =
        req.body;
      if (!title || !description || !mentor || !deadline_at) {
        return res.status(400).json({ msg: "Invalid Assesment Credentials." });
      }
      const instructor = await User.findOne({ _id: mentor });
      console.log(instructor);
      const newAssesment = new Assesment({
        mentor: instructor._id,
        title,
        description,
        deadline_at

      });

      console.log(title, description, mentor, deadline_at);

      await newAssesment.save();
      res.json({ msg: "Created a Assesment." });
    } catch (error) {
      console.log("Login");
      return res.status(500).json({ msg: error.message });
    }
  },


  getAssesments: async (req, res) => {
    try {
      const assesments = await Assesment.find();
      console.log(assesments.length);

      res.json({
        status: "success",
        result: assesments.length,
        assesments: assesments,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getMentorAssesments: async (req, res) => {
    try {
      // console.log(req.user);
      const assesments = await Assesment.find({ mentor: req.user.id });
      console.log(assesments.length);

      res.json({
        status: "success",
        result: assesments.length,
        assesments: assesments,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },


  submission: async (req, res) => {
    try {
      const { link, student, assesment } =
        req.body;
      if (!link || !student || !assesment) {
        return res.status(400).json({ msg: "Invalid Assesment Credentials." });
      }

      const newAssesmentSubmission = new AssesmentSubmission({
        link,
        student,
        assesment
      });

      await newAssesmentSubmission.save();
      res.json({ msg: "Assesment Submitted Successfully." });
    } catch (error) {

      return res.status(500).json({ msg: error.message });
    }
  },

  gradeAssesment: async (req, res) => {
    try {
      const { grade } =
        req.body;
      if (!grade) {
        return res.status(400).json({ msg: "Invalid Assesment Credentials." });
      }
      const submitAssesment = await AssesmentSubmission.findById(req.params.id);
      const assesment = await Assesment.findById(submitAssesment.assesment);
      if(assesment.mentor.toString() !==req.user.id){
        return res.status(400).json({ msg: "Not Authorized." });
      }
      await AssesmentSubmission.findOneAndUpdate(
        { _id: req.params.id },
        { grade }
      );
      
     
      res.json({ msg: "Submission grade Successfully." });
    } catch (error) {

      return res.status(500).json({ msg: error.message });
    }
  },

}





module.exports = assesmentControllers;