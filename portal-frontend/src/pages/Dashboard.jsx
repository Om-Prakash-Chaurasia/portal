import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_APP_API_URL;

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_URL}/courses`);
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses: ", error);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Welcome, {user?.name || "Guest"}</h2>
      {loading && <p>Loading Courses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          <h2>Your Courses: </h2>
          {courses.length === 0 ? (
            <p>No courses available</p>
          ) : (
            <ul>
              {courses.map((course) => (
                <li key={course._id}>{course.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
