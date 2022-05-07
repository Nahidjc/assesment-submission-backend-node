const User = require("../models/userModels");

const authStudent = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.body.student,
    });
    console.log(user);
    if (user.role === "mentor" || user.role === "admin") {
      return res.status(400).json({ msg: "Student Recources Access Denied." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authStudent;