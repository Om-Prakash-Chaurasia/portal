import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h2>Welcome, {user.name}</h2>
      {loading ? (
        <p>Loading Courses...</p>
      ) : (
        <>
          <h2>Your Courses:</h2>
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

export default Dashboard;
