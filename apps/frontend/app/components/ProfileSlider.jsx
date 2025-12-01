import React from "react";
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

const ProfileSlider = ({ isAdmin, onNav, onLogout }) => {
  return (
    <div className="absolute right-0 mt-3 w-60 bg-white border shadow-xl rounded-xl p-2 space-y-1 animate-slideDown">

      {/* ACCOUNT */}
      <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
        Account
      </p>

      <SliderButton icon={<User size={16} />} label="Profile" onClick={() => onNav("/profile")} />
      <SliderButton icon={<ShoppingBag size={16} />} label="My Orders" onClick={() => onNav("/orders")} />
      <SliderButton icon={<MapPin size={16} />} label="Manage Addresses" onClick={() => onNav("/addresses")} />
      <SliderButton icon={<Heart size={16} />} label="Wishlist" onClick={() => onNav("/wishlist")} />
      <SliderButton icon={<ShoppingCart size={16} />} label="My Cart" onClick={() => onNav("/cart")} />

      <hr />

      {/* PAYMENTS */}
      <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
        Payments
      </p>

      <SliderButton icon={<CreditCard size={16} />} label="Saved Cards" onClick={() => onNav("/payments")} />

      <hr />

      {/* SETTINGS */}
      <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
        Settings
      </p>

      <SliderButton icon={<Bell size={16} />} label="Notifications" onClick={() => onNav("/notifications")} />
      <SliderButton icon={<HelpCircle size={16} />} label="Help & Support" onClick={() => onNav("/support")} />

      {/* ADMIN */}
      {isAdmin && (
        <>
          <hr />
          <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
            Admin
          </p>

          <SliderButton
            icon={<LayoutDashboard size={16} />}
            label="Admin Dashboard"
            onClick={() => onNav("/admin")}
          />
        </>
      )}

      <hr />

      {/* DANGER ZONE */}
      <SliderButton
        icon={<LogOut size={16} />}
        label="Logout"
        onClick={onLogout}
        danger
      />

      <SliderButton
        icon={<Trash2 size={16} />}
        label="Delete Account"
        onClick={() => onNav("/delete-account")}
        dangerOutline
      />

    </div>
  );
};

/* -------------------------------------------------------
   INLINE BUTTON — SINGLE FILE ONLY (NO EXTRA COMPONENT)
--------------------------------------------------------*/
const SliderButton = ({
  icon,
  label,
  onClick,
  danger,
  dangerOutline,
}) => {
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
