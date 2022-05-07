const express = require("express");
const User = require("../models/userModels");
const Assesment = require("../models/assesmentModel");
const AssesmentSubmission = require("../models/submissionAssesmentModel");
const jwt = require("jsonwebtoken");

const assesmentControllers = {
  createAssesment: async (req, res) => {
    try {
      const { title, description, mentor, deadline_at } = req.body;
      if (!title || !description || !mentor || !deadline_at) {
        return res.status(400).json({ msg: "Invalid Assesment Credentials." });
      }
      const instructor = await User.findOne({ _id: mentor });
    
      const newAssesment = new Assesment({
        mentor: instructor._id,
        title,
        description,
        deadline_at,
      });

      await newAssesment.save();
      res.json({ msg: "Created a Assesment." });
    } catch (error) {
      console.log("Login");
      return res.status(500).json({ msg: error.message });
    }
  },
  updateAssesment:async (req, res) => {
    try {
        const { title,description, deadline_at} = req.body;
        if (!title || !description) {
            return res.status(400).json({ msg: "Invalid Assesment Credentials." });
        }

        const assesment = await Assesment.findById(req.params.id);
        if (!assesment) {
            return res.status(400).json({ msg: "Assesment Not Found." });
        }

        await Assesment.findOneAndUpdate(
            { _id: req.params.id },
            { title, description,deadline_at}
        );
        res.json({ msg: "Assesment is Updated." });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
},


  getAssesments: async (req, res) => {
    try {
      const assesments = await Assesment.find().select({
        mentor: 0,
        created_at: 0,
        createdAt:0,
        updatedAt:0
      });

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
      const { link, student, assesment } = req.body;
      if (!link || !student || !assesment) {
        return res.status(400).json({ msg: "Invalid Assesment Credentials." });
      }

      const newAssesmentSubmission = new AssesmentSubmission({
        link,
        student,
        assesment,
      });

      await newAssesmentSubmission.save();
      res.json({ msg: "Assesment Submitted Successfully." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  gradeAssesment: async (req, res) => {
    try {
      const { grade } = req.body;
      if (!grade) {
        return res.status(400).json({ msg: "Invalid Assesment Credentials." });
      }
      const submitAssesment = await AssesmentSubmission.findById(req.params.id);
      const assesment = await Assesment.findById(submitAssesment.assesment);
      const admin = await User.findOne({
        _id: req.user.id,
      });
      if (assesment.mentor.toString() !== req.user.id && admin.role !=="admin") {
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

  deleteSubmission: async (req, res) => {
    try {
      const submission = await AssesmentSubmission.findById(req.params.id);
     
     if (!submission) {
        return res.status(400).json({ msg: "Assesment Not Found." });
      }
     
      await AssesmentSubmission.findByIdAndDelete(req.params.id);
      res.json({ msg: "Submission Deleted." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteAssesment: async (req, res) => {
    try {
      const assesment = await Assesment.findById(req.params.id);
      if (!assesment) {
        return res.status(400).json({ msg: "Assesment Not Found." });
      }
     
      await Assesment.findByIdAndDelete(req.params.id);
      res.json({ msg: "Assesment Deleted." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAssesmentOfSubmission:async(req,res)=>{
    try{
      const userRole = await User.findById(req.user.id);
      if(userRole.role==="admin" || userRole.role==="mentor"){
        const assesmentSubmission = await AssesmentSubmission.find({
          assesment: req.params.id}).select({          
            createdAt:0,
            updatedAt:0
          });
     
          res.json({ msg: "success" ,result:assesmentSubmission});
      }else{
      const assesmentSubmission = await AssesmentSubmission.find({
          assesment: req.params.id,student:userRole._id}).select({        
            createdAt:0,
            updatedAt:0
          });
        

          res.json({ msg: "success" ,result:assesmentSubmission});
      }
    
     
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
    
    
  }

};

module.exports = assesmentControllers;
