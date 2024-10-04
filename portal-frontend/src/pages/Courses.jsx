import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/courses`
        );
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading Courses...</p>
      ) : (
        <>
          <h2>Courses</h2>
          <ul>
            {courses.map((course) => (
              <li key={course._id}>{course.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Courses;
