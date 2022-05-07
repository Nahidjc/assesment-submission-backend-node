const assesmentController = require("../controllers/assesmentController");
const router = require("express").Router();
const mentor = require("../middleware/mentorAuth");
const student = require("../middleware/studentAuth");
const userAuth = require("../middleware/useAuth");



router.get("/:id",userAuth,assesmentController.getAssesmentOfSubmission)
router.post("/create",mentor, assesmentController.createAssesment);
router.post("/submission",student, assesmentController.submission);
router.get("/get-assesments", assesmentController.getAssesments);
router.get("/my-assesments",mentor, assesmentController.getMentorAssesments);
router.put("/grade-assesment/:id",mentor, assesmentController.gradeAssesment);



module.exports = router;