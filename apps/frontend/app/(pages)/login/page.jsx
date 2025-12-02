"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "../../utils/api";
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
      const res = await authAPI.login(payload);
      if (!res.data?.token) {
        toast.error("Unexpected response from server");
        setLoading(false);
        return;
      }
      login(res.data.token);
      toast.success("✅ Login successful!");
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-light)]/10 via-transparent to-[var(--accent)]/5"></div>

      <button
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors z-10"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-md glass-panel p-10 rounded-3xl shadow-2xl relative z-10 animate-scale-in">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif font-bold text-[var(--foreground)] mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to continue to{" "}
            <span className="text-[var(--primary)] font-medium">Messia</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[var(--foreground)] font-medium mb-2 ml-1">
              Email or Username
            </label>
            <input
              type="text"
              name="input"
              required
              value={formData.input}
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
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 text-lg shadow-lg hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-[var(--primary)] font-medium hover:underline hover:text-[var(--primary-dark)] transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
