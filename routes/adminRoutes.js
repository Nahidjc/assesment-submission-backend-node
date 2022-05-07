const assesmentController = require("../controllers/assesmentController");
const router = require("express").Router();
const admin = require("../middleware/adminAuth");
const userController = require("../controllers/userController");



router.post("/add-user",admin, userController.register);
router.delete("/delete-user/:id",admin,userController.deleteUser);
router.put("/update-user/:id",admin,userController.updateUser);



router.post("/create-assesment",admin, assesmentController.createAssesment);
router.put("/update-assesment/:id",admin, assesmentController.updateAssesment);
router.delete("/delete-assesment/:id",admin,assesmentController.deleteAssesment)

router.put("/grade-submission/:id",admin, assesmentController.gradeAssesment);
router.delete("/delete-submission/:id",admin, assesmentController.deleteSubmission);

module.exports = router;