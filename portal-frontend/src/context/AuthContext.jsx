import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode(res.data.token);
      setUser(decoded.user);
    } catch (err) {
      console.error("Login failed : ", err);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      // const apiUrl = typeof process !== 'undefined' ? import.meta.env.VITE_APP_API_URL : '';
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/register`,
        { name, email, password, role }
      );
      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode(res.data.token);
      setUser(decoded.user);
    } catch (err) {
      console.error("Registration failed : ", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// Dummy commit