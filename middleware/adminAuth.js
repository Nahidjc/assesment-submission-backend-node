const User = require("../models/userModels");

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });
    if (user.role === "student" || user.role === "mentor") {
      return res.status(400).json({ msg: "Admin Recources Access Denied." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;