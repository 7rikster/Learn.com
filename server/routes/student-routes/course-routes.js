const express = require("express");
const {
  getAllStudentViewCourses,
  getStudentViewCoursesDetails,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controller/course-controller");
const router = express.Router();

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCoursesDetails);
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

module.exports = router;
