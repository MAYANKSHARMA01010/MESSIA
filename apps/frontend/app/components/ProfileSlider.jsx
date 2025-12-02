import React from "react";
import toast from "react-hot-toast";
import {
  User,
  LayoutDashboard,
  LogOut,
  MapPin,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Bell,
  CreditCard,
  HelpCircle,
  Trash2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

const comingSoon = (feature) =>
  toast("🚧 " + feature + " coming soon!", {
    duration: 2500,
  });

const ProfileSlider = ({ isAdmin, onNav, onLogout }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="absolute right-0 mt-3 w-60 bg-[var(--surface)] border border-[var(--border)] shadow-xl rounded-xl p-2 space-y-1 animate-slideDown z-50">
      {}
      <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
        Account
      </p>
      <SliderButton
        icon={<User size={16} />}
        label="Profile"
        onClick={() => onNav("/profile")}
      />
      <SliderButton
        icon={<ShoppingBag size={16} />}
        label="My Orders"
        onClick={() => comingSoon("Orders")}
      />
      <SliderButton
        icon={<Heart size={16} />}
        label="Wishlist"
        onClick={() => comingSoon("Wishlist")}
      />
      <SliderButton
        icon={<ShoppingCart size={16} />}
        label="My Cart"
        onClick={() => onNav("/cart")}
      />
      <SliderButton
        icon={<MapPin size={16} />}
        label="Manage Addresses"
        onClick={() => onNav("/addresses")}
      />
      <hr />
      {}
      <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
        Payments
      </p>
      <SliderButton
        icon={<CreditCard size={16} />}
        label="Saved Cards"
        onClick={() => comingSoon("Saved cards")}
      />
      <hr />
      {}
      <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
        Settings
      </p>
      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          <span>Theme</span>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none"
        >
          <span
            className={`${
              theme === "dark" ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </button>
      </div>
      <SliderButton
        icon={<Bell size={16} />}
        label="Notifications"
        onClick={() => comingSoon("Notifications")}
      />
      <SliderButton
        icon={<HelpCircle size={16} />}
        label="Help & Support"
        onClick={() => comingSoon("Support center")}
      />
      {}
      {isAdmin && (
        <>
          <hr />
          <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
            Admin
          </p>
          <SliderButton
            icon={<LayoutDashboard size={16} />}
            label="Admin Dashboard"
            onClick={() => onNav("/manage-products")}
          />
          <SliderButton
            icon={<ShoppingBag size={16} />}
            label="Manage Products"
            onClick={() => onNav("/manage-products")}
          />
        </>
      )}
      <hr />
      {}
      <SliderButton
        icon={<LogOut size={16} />}
        label="Logout"
        onClick={onLogout}
        danger
      />
      <SliderButton
        icon={<Trash2 size={16} />}
        label="Delete Account"
        onClick={() => comingSoon("Account deletion")}
        dangerOutline
      />
    </div>
  );
};
const SliderButton = ({ icon, label, onClick, danger, dangerOutline }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition font-medium
        ${
          danger
            ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            : dangerOutline
            ? "text-red-500 border border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            : "text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-[var(--surface-alt)]"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
};
export default ProfileSlider;
