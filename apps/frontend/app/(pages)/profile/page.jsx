/* eslint-disable react-hooks/exhaustive-deps */
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
} from "lucide-react";
import toast from "react-hot-toast";

function ProfilePage() {
  const { token, isLoggedIn, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
      : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to access your profile.");
      router.push("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          toast.success(`Welcome back, ${data.user.name.split(" ")[0]}! 🎉`);
        } else {
          toast.error(data.ERROR || "Failed to load profile.");
          console.error("Error fetching user:", data.ERROR);
        }
      } catch (err) {
        toast.error("Error fetching profile. Please try again later.");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    logout();
    toast.success("You’ve been logged out successfully 👋");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 text-gray-600">
        <div className="animate-pulse text-center">
          <p className="text-lg font-medium text-pink-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <p className="text-lg">No profile data found ❌</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 h-36 relative flex items-end justify-center">
          <div className="absolute -bottom-10 w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
            <UserCircle2 size={60} className="text-pink-600" />
          </div>
        </div>

        <div className="pt-16 pb-10 px-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500 mt-1">@{user.username}</p>

          <p className="mt-4 text-sm text-gray-500 italic">
            “Spreading smiles, one gift at a time 🎁”
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={18} className="text-pink-600" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <User size={18} className="text-pink-600" />
              <span>{user.gender || "Prefer not to say"}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Calendar size={18} className="text-pink-600" />
              <span>
                Joined{" "}
                {new Date(user.createdAt || Date.now()).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <span className="font-medium text-gray-600">Role:</span>
              <span className="font-medium text-pink-600 uppercase">
                {user.role || "USER"}
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => toast("Edit profile coming soon ✏️")}
              className="bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => router.push("/orders")}
              className="border border-pink-600 text-pink-600 px-6 py-2.5 rounded-lg hover:bg-pink-50 transition"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-gray-500 text-sm text-center">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-pink-600 font-medium">Messia</span> — Made with
          ❤️ for Gifting Lovers
        </p>
      </footer>
    </div>
  );
}

export default ProfilePage;
