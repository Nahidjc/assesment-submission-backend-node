const User = require("../models/userModels");

const authMentor = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.body.mentor,
    });
    if (user.role === "student" || user.role === "admin") {
      return res.status(400).json({ msg: "Mentor Recources Access Denied." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authMentor;