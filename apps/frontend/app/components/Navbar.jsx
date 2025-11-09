"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    router.push("/");
  };

  const handleNavClick = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("/")}
            className="text-2xl font-semibold tracking-tight text-gray-800 focus:outline-none cursor-pointer"
          >
            Messia<span className="text-pink-600">.</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-600 transition">Home</Link>
            <Link href="/gifts" className="text-gray-700 hover:text-pink-600 transition">Gifts</Link>
            <Link href="/about" className="text-gray-700 hover:text-pink-600 transition">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition">Contact</Link>

            <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:border-pink-600 hover:text-pink-600 transition"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>

                  {/* Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleNavClick("/profile");
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-2"
                      >
                        <User size={16} /> My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick("/login")}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:border-pink-600 hover:text-pink-600 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick("/register")}
                    className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2.5 rounded-lg text-gray-800 hover:bg-gray-100 active:scale-95 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm md:hidden">
          <div className="bg-white shadow-md absolute top-16 left-0 w-full px-4 pt-2 pb-4 space-y-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-pink-600">Home</Link>
            <Link href="/gifts" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-pink-600">Gifts</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-pink-600">About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-pink-600">Contact</Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="block w-full text-center border border-gray-300 rounded-full py-2 text-gray-700 hover:border-pink-600 hover:text-pink-600 transition"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center border border-gray-300 rounded-full py-2 text-gray-700 hover:border-red-600 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick("/login")}
                  className="block w-full text-center border border-gray-300 rounded-full py-2 text-gray-700 hover:border-pink-600 hover:text-pink-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick("/register")}
                  className="block w-full text-center bg-pink-600 text-white rounded-full py-2 hover:bg-pink-700 transition"
                >
                  Register
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
