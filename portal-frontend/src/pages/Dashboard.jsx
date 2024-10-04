import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/courses`
      );
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h2>Welcome,</h2>
      <h3>Your Courses:</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
