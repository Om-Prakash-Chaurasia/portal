const express = require("express");
const Course = require("../models/courseModel");
const auth = require("../middleware/auth");
const router = express.Router();

// get all courses
// router.get("/", async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server error");
//   }
// });

// create new course (restricted to mentor/admins)
router.post("/", auth, async (req, res) => {
  const { title, description, lessons } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      lessons,
      createdBy: req.user.id,
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
