"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  UserCircle2,
  LogOut,
  Save,
  X,
  Edit,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "@/app/utils/api";

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

  useEffect(() => {
    if (!isLoggedIn) {
      // toast.error("You must be logged in to access your profile.");
      router.replace("/login");
      return;
    }
  }, [isLoggedIn, router]);

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
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          logout();
          router.replace("/login");
        } else {
          toast.error("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, logout, router]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.replace("/");
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authAPI.updateProfile(formData);
      if (res.data?.user) {
        setUser(res.data.user);
        setEditing(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-lg mb-4">No profile data found</p>
        <button
          onClick={() => router.replace("/login")}
          className="btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-end mb-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-full transition-all font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden animate-slide-up">
            {/* Header Banner */}
            <div className="h-48 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)] relative">
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="w-32 h-32 rounded-full bg-[var(--surface)] p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-[var(--surface-alt)] flex items-center justify-center text-[var(--primary)] overflow-hidden">
                    <UserCircle2 size={120} strokeWidth={1} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-20 pb-12 px-6 sm:px-12 text-center">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--foreground)]">
                {user.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
                @{user.username}
              </p>

              {!editing ? (
                <div className="mt-12 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                    <div className="p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--border)] flex items-center gap-4 hover:border-[var(--primary-light)] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                          Email
                        </p>
                        <p className="font-medium text-[var(--foreground)] truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--border)] flex items-center gap-4 hover:border-[var(--primary-light)] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                          Gender
                        </p>
                        <p className="font-medium text-[var(--foreground)]">
                          {user.gender || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--border)] flex items-center gap-4 hover:border-[var(--primary-light)] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                          Joined
                        </p>
                        <p className="font-medium text-[var(--foreground)]">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--border)] flex items-center gap-4 hover:border-[var(--primary-light)] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                        <div className="text-sm font-bold">ID</div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                          Role
                        </p>
                        <p className="font-medium text-[var(--foreground)] capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => setEditing(true)}
                      className="btn-primary flex items-center justify-center gap-2 px-8"
                    >
                      <Edit size={18} /> Edit Profile
                    </button>
                    <button
                      onClick={() => router.push("/orders")}
                      className="btn-outline flex items-center justify-center gap-2 px-8"
                    >
                      <ShoppingBag size={18} /> View Orders
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleUpdate}
                  className="mt-10 max-w-lg mx-auto animate-fade-in"
                >
                  <div className="space-y-6 text-left">
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-2 ml-1">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-2 ml-1">
                        Username
                      </label>
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Your username"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-2 ml-1">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="input-premium appearance-none cursor-pointer"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center mt-10">
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn-primary flex items-center gap-2 px-8 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} /> Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-8 py-3 rounded-full border border-[var(--border)] text-gray-500 hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)] transition-all flex items-center gap-2 font-medium"
                    >
                      <X size={18} /> Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
