"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  UserCircle2,
  LogOut,
  ArrowLeft,
  Save,
  X,
  Edit,
} from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "../../utils/api";
function ProfilePage() {
  const { token, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    gender: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to access your profile.");
      router.replace("/login");
      return;
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const res = await authAPI.profile();
        if (res.data?.user) {
          setUser(res.data.user);
          setFormData({
            name: res.data.user.name || "",
            username: res.data.user.username || "",
            gender: res.data.user.gender || "",
          });
        } else {
          toast.error("Invalid profile response ❌");
          setMessage("Invalid profile response ❌");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          logout();
          router.replace("/login");
        } else {
          toast.error("Failed to load profile ❌");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully 👋");
    router.replace("/");
  };
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await authAPI.updateProfile(formData);
      if (res.data?.user) {
        setUser(res.data.user);
        setEditing(false);
        toast.success("✅ Profile updated successfully!");
        setMessage("✅ Profile updated successfully!");
      } else {
        toast.error("Update failed ❌");
        setMessage("❌ Update failed");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Error updating profile ❌");
      setMessage("❌ Error updating profile");
    } finally {
      setSaving(false);
    }
  };
  if (!isLoggedIn) return null;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100">
        <p className="text-lg font-medium text-pink-600 animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <p className="text-lg">No profile data found ❌</p>
        <button
          onClick={() => router.replace("/login")}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 py-10 px-4 flex flex-col items-center">
      {}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
      {}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 h-36 relative flex items-end justify-center">
          <div className="absolute -bottom-10 w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
            <UserCircle2 size={60} className="text-pink-600" />
          </div>
        </div>
        <div className="pt-16 pb-10 px-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 mt-1">@{user.username}</p>
          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          {!editing ? (
            <>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-md mx-auto">
                <div className="flex gap-3">
                  <Mail size={18} className="text-pink-600" />
                  {user.email}
                </div>
                <div className="flex gap-3">
                  <User size={18} className="text-pink-600" />
                  {user.gender || "Prefer not to say"}
                </div>
                <div className="flex gap-3">
                  <Calendar size={18} className="text-pink-600" />
                  Joined {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </div>
                <div>
                  Role:
                  <span className="ml-2 text-pink-600 font-semibold">
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="mt-10 flex justify-center gap-4">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition flex items-center gap-2"
                >
                  <Edit size={16} /> Edit Profile
                </button>
                <button
                  onClick={() => router.push("/orders")}
                  className="border border-pink-600 text-pink-600 px-6 py-2.5 rounded-lg hover:bg-pink-50 transition"
                >
                  View Orders
                </button>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleUpdate}
              className="mt-8 max-w-md mx-auto space-y-5"
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full border rounded-lg px-4 py-2.5"
              />
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border rounded-lg px-4 py-2.5"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-pink-600 text-white px-6 py-2.5 rounded-lg disabled:opacity-60"
                >
                  <Save size={16} />
                  {saving ? " Saving..." : " Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="border border-gray-400 px-6 py-2.5 rounded-lg"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-600 font-medium">Messia</span>
      </footer>
    </div>
  );
}
export default ProfilePage;
