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
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <button
            onClick={() => handleNavClick("/")}
            className="text-2xl font-semibold tracking-tight text-gray-800"
          >
            Messia<span className="text-pink-600">.</span>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/products" className="nav-link">Products</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>

            {/* ✅ CART ROUTE */}
            {isLoggedIn && (
              <Link href="/cart" className="nav-link">
                Cart
              </Link>
            )}

            {/* AUTH UI */}
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick("/login")}
                  className="btn-outline"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavClick("/register")}
                  className="btn-primary"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowSlider(!showSlider)}
                  className="flex items-center gap-2 px-4 py-2 border rounded-full hover:border-pink-500 transition"
                >
                  <User size={18} />
                  <span>{user?.name || "User"}</span>
                  <ChevronDown size={16} />
                </button>

                {/* PROFILE SLIDER */}
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

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm md:hidden">
          <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 space-y-3">
            
            <Link onClick={() => setIsOpen(false)} href="/">Home</Link>
            <Link onClick={() => setIsOpen(false)} href="/products">Products</Link>
            <Link onClick={() => setIsOpen(false)} href="/about">About</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact">Contact</Link>

            {/* ✅ CART (mobile) */}
            {isLoggedIn && (
              <Link onClick={() => setIsOpen(false)} href="/cart">
                Cart
              </Link>
            )}

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick("/login")}
                  className="btn-outline w-full"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavClick("/register")}
                  className="btn-primary w-full"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="btn-outline w-full"
                >
                  Profile
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleNavClick("/admin")}
                    className="btn-outline w-full"
                  >
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="btn-danger w-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
