/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = API_BASE_URL;

  const fetchUser = async (authToken) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
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
        fetchUser(storedToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUser(newToken);
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
