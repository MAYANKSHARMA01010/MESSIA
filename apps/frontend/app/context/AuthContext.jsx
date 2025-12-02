"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../utils/api";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const response = await authAPI.profile();
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        fetchUser();
      } else {
        setLoading(false);
      }
    }
  }, []);
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUser();
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  const isLoggedIn = !!token;
  const isAdmin = user?.role === "ADMIN";
  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, isAdmin, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
