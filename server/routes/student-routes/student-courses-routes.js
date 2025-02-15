const express = require("express");
const {
  getStudentCoursesById,
} = require("../../controllers/student-controller/student-courses-controller");

const router = express.Router();

router.get("/get/:studentId", getStudentCoursesById);

module.exports = router;
