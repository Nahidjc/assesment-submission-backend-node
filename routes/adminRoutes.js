const assesmentController = require("../controllers/assesmentController");
const router = require("express").Router();
const admin = require("../middleware/adminAuth");
const userController = require("../controllers/userController");



router.post("/add-user",admin, userController.register);
router.post("/create-assesment",admin, assesmentController.createAssesment);
router.put("/grade-assesment/:id",admin, assesmentController.gradeAssesment);

router.delete("/delete-assesment/:id",admin,assesmentController.deleteAssesment)

module.exports = router;