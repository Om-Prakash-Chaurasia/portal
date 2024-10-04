import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";

// PrivateRoute component for handling protected routes
const PrivateRoute = ({ childern }) => {
  const { user, loading } = useContext(AuthContext);

  // display loading message while checking authentication state
  if (loading) return <div>Loading...</div>;

  // if user is authenticated, render the childern (protected routes), otherwise redirect to login
  return user ? childern : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* public routes */}
          {/* redirect root '/' to login */}
          <Route path="/" element={<Navigate to='/login' />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
