"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
 
import { API_BASE_URL } from "../../utils/api";

function Login() {
  const [formData, setFormData] = useState({
    input: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getErrorMessage = (err, fallback = "Login failed ❌") => {
    if (err.response?.data?.ERROR) return err.response.data.ERROR;
    if (err.response?.data?.message) return err.response.data.message;
    if (err.message?.includes("timeout"))
      return "Request timed out. Try again.";
    if (err.request) return "No response from server. Check your network.";
    return fallback;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const input = formData.input.trim();
    const password = formData.password.trim();

    if (!input || !password) {
      toast.error("⚠️ Email/Username and Password are required");
      setLoading(false);
      return;
    }

    const payload = {
      password,
      ...(input.includes("@")
        ? { email: input.toLowerCase() }
        : { username: input.toLowerCase() }),
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 8000,
      });

      if (!res.data?.token) {
        toast.error("Unexpected response from server");
        setLoading(false);
        return;
      }

      // ✅ Save token + auto-load cart
      login(res.data.token);

      toast.success("✅ Login successful!");

      // ✅ Ecommerce flow: go to products
      router.push("/");

    } catch (err) {
      console.error("Login error:", err);
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 px-4 relative">

      {/* Back */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-pink-100">

        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back to <span className="text-pink-600">Messia</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="input"
              required
              value={formData.input}
              onChange={handleChange}
              placeholder="you@example.com or john_doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-pink-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
