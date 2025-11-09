"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
      : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      email: formData.email.trim() || undefined,
      username: formData.username.trim() || undefined,
      password: formData.password,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMessage(data.ERROR || "Login failed ❌");
        return;
      }

      login(data.token);
      setMessage("✅ Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 px-4 relative">
      {/* ✅ Back to Home Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </button>

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
              name="email"
              required
              value={formData.email || formData.username}
              onChange={handleChange}
              placeholder="you@example.com or john_doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}

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
