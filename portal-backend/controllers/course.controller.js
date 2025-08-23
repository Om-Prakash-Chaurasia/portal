const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Fetch Course Error: ", error.message);
    res.status(500).json({ msg: "Server error while fetching courses." });
  }
};

const createCourse = async (req, res) => {
  const { title, description, lessons } = req.body;

  // Validating input
  if (!title || !description || !lessons || !Array.isArray(lessons))
    return res.status(400).json({ msg: "Please provide valid course data." });

  try {
    const newCourse = new Course({
      title,
      description,
      lessons,
      createdBy: req.user.id,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json({ course: savedCourse });
  } catch (error) {
    console.error("Create Course Error: ", error.message);
    res.status(500).send("Server error. Please try again later.");
  }
};

module.exports = { getAllCourses, createCourse };
