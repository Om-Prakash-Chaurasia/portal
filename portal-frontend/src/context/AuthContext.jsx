import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_APP_API_URL;

const parseToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token: ", decoded);
    return decoded.user ? decoded.user : decoded;
  } catch (error) {
    console.error("Invalid token: ", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      setUser(parseToken(token));
    } else {
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, []);

  const handleAuth = (token) => {
    localStorage.setItem("token", token);
    setUser(parseToken(token));
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      handleAuth(data.token);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const { data } = await axios.post(`${API_URL}/user/register`, {
        name,
        email,
        password,
        role,
      });
      handleAuth(data.token);
    } catch (error) {
      console.error("Registration failed: ", error);
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
}

export { AuthContext, AuthProvider };
