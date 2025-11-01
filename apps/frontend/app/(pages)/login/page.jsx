"use client";
import React, { useState } from "react";
import Link from "next/link";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back to <span className="text-pink-600">Messia</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
          <Link href="/register" className="text-pink-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
