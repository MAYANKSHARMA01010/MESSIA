"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
function Register() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const getErrorMessage = (err, fallback = "Registration failed ❌") => {
    if (err.response?.data?.ERROR) return err.response.data.ERROR;
    if (err.response?.data?.message) return err.response.data.message;
    if (err.message?.includes("timeout"))
      return "Request timed out. Try again.";
    if (err.request) return "No response from server. Check your network.";
    return fallback;
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (formData.password !== formData.confirm_password) {
      setLoading(false);
      toast.error("❌ Passwords do not match");
      setMessage("❌ Passwords do not match");
      return;
    }
    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim().toLowerCase(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirm_password: formData.confirm_password,
    };
    try {
      const res = await authAPI.register(payload);
      setLoading(false);
      if (res.status === 201 || res.data?.message?.includes("success")) {
        toast.success("✅ Registration successful! Redirecting...");
        setMessage("✅ Registration successful! Redirecting...");
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        setTimeout(() => router.push("/login"), 1200);
      } else {
        const msg = res.data?.ERROR || "Registration failed ❌";
        toast.error(`❌ ${msg}`);
        setMessage(`❌ ${msg}`);
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      console.error("Register error:", err);
      setLoading(false);
      toast.error(`❌ ${msg}`);
      setMessage(`❌ ${msg}`);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[var(--primary-light)]/10 via-transparent to-[var(--accent)]/5"></div>

      <button
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors z-10"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-md glass-panel p-10 rounded-3xl shadow-2xl relative z-10 animate-scale-in my-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-[var(--foreground)] mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Join{" "}
            <span className="text-[var(--primary)] font-medium">Messia</span>{" "}
            today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[var(--foreground)] font-medium mb-2 ml-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-[var(--foreground)] font-medium mb-2 ml-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="john_doe"
              className="w-full px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-[var(--foreground)] font-medium mb-2 ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-[var(--foreground)] font-medium mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-[var(--foreground)] font-medium mb-2 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] transition-all shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 text-lg shadow-lg hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        {message && (
          <p
            className={`text-center mt-6 text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--primary)] font-medium hover:underline hover:text-[var(--primary-dark)] transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
