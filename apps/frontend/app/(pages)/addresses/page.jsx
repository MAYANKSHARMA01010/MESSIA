"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Edit, CheckCircle, Save, X } from "lucide-react";

import { addressAPI } from "@/app/utils/api";

/* ========================== INITIAL FORM ========================== */
const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  state: "",
  district: "",
  city: "",
  pincode: "",
  isDefault: false,
};

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  /* ========================== LOAD DATA ========================== */
  const loadAddresses = async () => {
    try {
      const res = await addressAPI.list();
      setAddresses(res.data);
    } catch {
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  /* =================== HANDLE INPUT =================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= SAVE (CREATE / UPDATE) ================= */
  const submitHandler = async () => {
    try {
      if (editingId) {
        await addressAPI.update(editingId, form);
        toast.success("Address updated");
      } else {
        await addressAPI.create(form);
        toast.success("Address added");
      }

      resetForm();
      loadAddresses();
    } catch {
      toast.error("Failed to save address");
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  /* ====================== EDIT ====================== */
  const editAddress = (addr) => {
    setEditingId(addr.id);

    setForm({
      name: addr.name,
      email: addr.email,
      phone: addr.phone,
      address1: addr.address1,
      address2: addr.address2 || "",
      state: addr.state,
      district: addr.district,
      city: addr.city,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
  };

  /* ====================== DELETE ====================== */
  const deleteAddress = async (id) => {
    if (!confirm("Delete this address?")) return;

    try {
      await addressAPI.remove(id);
      toast.success("Deleted");
      loadAddresses();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ==================== SET DEFAULT ==================== */
  const setDefault = async (id) => {
    try {
      await addressAPI.setDefault(id);
      toast.success("Default updated");
      loadAddresses();
    } catch {
      toast.error("Failed to set default");
    }
  };

  /* ======================================================== */

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">My Addresses</h1>

      {/* ===================== FORM ===================== */}
      <div className="bg-zinc-900 p-6 mb-10 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="input"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            className="input md:col-span-2"
            name="address1"
            placeholder="Address Line 1"
            value={form.address1}
            onChange={handleChange}
          />

          <input
            className="input md:col-span-2"
            name="address2"
            placeholder="Address Line 2"
            value={form.address2}
            onChange={handleChange}
          />

          <input
            className="input"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
          />

          <input
            className="input"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
          />

          <input
            className="input"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <input
            className="input"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
          />
        </div>

        {/* DEFAULT CHECKBOX */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
          />
          <label>Set as default address</label>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 pt-4">
          <button onClick={submitHandler} className="btn-primary">
            <Save size={18} /> Save
          </button>

          {editingId && (
            <button onClick={resetForm} className="btn-secondary">
              <X size={18} /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* ===================== LIST ===================== */}
      <div className="grid gap-4">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {a.name}
                {a.isDefault && (
                  <span className="text-green-400 ml-2 text-sm">
                    (Default)
                  </span>
                )}
              </h3>

              <p className="text-sm text-zinc-400">
                {a.email} • {a.phone}
              </p>

              <p className="text-zinc-300 text-sm mt-1">
                {a.address1}
                {a.address2 && `, ${a.address2}`}
                <br />
                {a.city}, {a.district}, {a.state} - {a.pincode}
              </p>
            </div>

            <div className="flex gap-3">
              {!a.isDefault && (
                <button
                  className="icon-btn"
                  onClick={() => setDefault(a.id)}
                  title="Set Default"
                >
                  <CheckCircle size={20} />
                </button>
              )}

              <button
                className="icon-btn"
                onClick={() => editAddress(a)}
                title="Edit"
              >
                <Edit size={20} />
              </button>

              <button
                className="icon-btn text-red-400"
                onClick={() => deleteAddress(a.id)}
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
