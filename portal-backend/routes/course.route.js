const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const {
  getAllCourses,
  createCourse,
} = require("../controllers/course.controller");

// get all courses.
router.get("/", getAllCourses);

// create new course (restricted to mentors and admins only).
router.post("/", auth, checkRole(["mentor", "admin"]), createCourse);

module.exports = router;
