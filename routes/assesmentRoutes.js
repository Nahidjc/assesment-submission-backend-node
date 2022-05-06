const assesmentController = require("../controllers/assesmentController");
const router = require("express").Router();
const mentor = require("../middleware/mentorAuth");
const student = require("../middleware/studentAuth");
const auth = require("../middleware/userAuth");



router.post("/create",mentor, assesmentController.createAssesment);
router.post("/submission",student, assesmentController.submission);
router.get("/getAssesments", assesmentController.getAssesments);
router.get("/my-assesments",auth, assesmentController.getMentorAssesments);



module.exports = router;