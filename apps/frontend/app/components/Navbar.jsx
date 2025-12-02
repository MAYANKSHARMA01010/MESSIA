"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProfileSlider from "./ProfileSlider";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const router = useRouter();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleNavClick = (path) => {
    router.push(path);
    setIsOpen(false);
    setShowSlider(false);
  };
  const handleLogout = () => {
    logout();
    router.push("/");
    setShowSlider(false);
    setIsOpen(false);
  };
  return (
    <nav className="fixed top-0 left-0 w-full glass z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => handleNavClick("/")}
            className="text-3xl font-serif font-bold tracking-tight text-[var(--foreground)]"
          >
            Messia<span className="text-[var(--primary)]">.</span>
          </button>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link text-base">
              Home
            </Link>
            <Link href="/products" className="nav-link text-base">
              Products
            </Link>
            <Link href="/about" className="nav-link text-base">
              About
            </Link>
            <Link href="/contact" className="nav-link text-base">
              Contact
            </Link>
            {isLoggedIn && (
              <Link href="/cart" className="nav-link text-base">
                Cart
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick("/login")}
                  className="btn-outline px-6"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick("/register")}
                  className="btn-primary px-6 shadow-glow"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowSlider(!showSlider)}
                  className="flex items-center gap-3 px-5 py-2.5 border border-[var(--border)] rounded-full hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 bg-[var(--surface)]"
                >
                  <User size={20} className="text-[var(--primary)]" />
                  <span className="font-medium">{user?.name || "User"}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {showSlider && (
                  <ProfileSlider
                    isAdmin={isAdmin}
                    onNav={handleNavClick}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            )}
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-alt)] text-[var(--foreground)]"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md md:hidden z-40">
          <div className="absolute top-20 left-0 w-full bg-[var(--surface)] shadow-xl p-6 space-y-4 border-b border-[var(--border)]">
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className="block text-lg font-medium text-[var(--foreground)]"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/products"
              className="block text-lg font-medium text-[var(--foreground)]"
            >
              Products
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/about"
              className="block text-lg font-medium text-[var(--foreground)]"
            >
              About
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/contact"
              className="block text-lg font-medium text-[var(--foreground)]"
            >
              Contact
            </Link>
            {isLoggedIn && (
              <Link
                onClick={() => setIsOpen(false)}
                href="/cart"
                className="block text-lg font-medium text-[var(--foreground)]"
              >
                Cart
              </Link>
            )}
            {!isLoggedIn ? (
              <div className="grid gap-3 pt-4">
                <button
                  onClick={() => handleNavClick("/login")}
                  className="btn-outline w-full justify-center"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick("/register")}
                  className="btn-primary w-full justify-center"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="grid gap-3 pt-4">
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="btn-outline w-full justify-center"
                >
                  Profile
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleNavClick("/admin")}
                    className="btn-outline w-full justify-center"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-danger w-full justify-center"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
