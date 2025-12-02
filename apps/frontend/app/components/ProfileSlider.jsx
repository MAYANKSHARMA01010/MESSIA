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
} from "lucide-react";
const comingSoon = (feature) =>
  toast("🚧 " + feature + " coming soon!", {
    duration: 2500,
  });
const ProfileSlider = ({ isAdmin, onNav, onLogout }) => {
  return (
    <div className="absolute right-0 mt-3 w-60 bg-white border shadow-xl rounded-xl p-2 space-y-1 animate-slideDown">
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
        onClick={() => onNav("/wishlist")}
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
      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition
        ${
          danger
            ? "text-red-500 hover:bg-red-50"
            : dangerOutline
            ? "text-red-500 border border-red-300 hover:bg-red-50"
            : "hover:bg-gray-100"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
};
export default ProfileSlider;
