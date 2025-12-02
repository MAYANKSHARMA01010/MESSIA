"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Trash2,
  Edit,
  CheckCircle,
  Save,
  X,
  Plus,
  MapPin,
  Home,
  Loader2,
} from "lucide-react";
import { addressAPI } from "@/app/utils/api";

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
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const res = await addressAPI.list();
      setAddresses(res.data);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async () => {
    // Basic validation
    if (!form.name || !form.address1 || !form.pincode || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await addressAPI.update(editingId, form);
        toast.success("Address updated successfully");
      } else {
        await addressAPI.create(form);
        toast.success("New address added");
      }
      resetForm();
      loadAddresses();
      setIsFormOpen(false);
    } catch {
      toast.error("Failed to save address");
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

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
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteAddress = async (id) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await addressAPI.remove(id);
      toast.success("Address deleted");
      loadAddresses();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const setDefault = async (id) => {
    try {
      await addressAPI.setDefault(id);
      toast.success("Default address updated");
      loadAddresses();
    } catch {
      toast.error("Failed to set default address");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-serif font-bold text-[var(--foreground)]">
                My Addresses
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage your shipping addresses and delivery details.
              </p>
            </div>
            {!isFormOpen && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} /> Add New Address
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            {isFormOpen && (
              <div className="lg:col-span-1">
                <div className="glass-panel p-6 rounded-3xl sticky top-24 animate-slide-up">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      {editingId ? <Edit size={20} /> : <Plus size={20} />}
                      {editingId ? "Edit Address" : "Add New Address"}
                    </h2>
                    <button
                      onClick={() => {
                        setIsFormOpen(false);
                        resetForm();
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <input
                      className="input-premium"
                      name="name"
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <input
                      className="input-premium"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <input
                      className="input-premium"
                      name="phone"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    <input
                      className="input-premium"
                      name="address1"
                      placeholder="Address Line 1 *"
                      value={form.address1}
                      onChange={handleChange}
                    />
                    <input
                      className="input-premium"
                      name="address2"
                      placeholder="Address Line 2"
                      value={form.address2}
                      onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        className="input-premium"
                        name="city"
                        placeholder="City *"
                        value={form.city}
                        onChange={handleChange}
                      />
                      <input
                        className="input-premium"
                        name="pincode"
                        placeholder="Pincode *"
                        value={form.pincode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        className="input-premium"
                        name="district"
                        placeholder="District"
                        value={form.district}
                        onChange={handleChange}
                      />
                      <input
                        className="input-premium"
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-center gap-3 py-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <label
                        htmlFor="isDefault"
                        className="text-sm font-medium text-[var(--foreground)]"
                      >
                        Set as default address
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={submitHandler}
                        className="btn-primary flex-1 flex justify-center items-center gap-2"
                      >
                        <Save size={18} /> Save Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* List Section */}
            <div className={isFormOpen ? "lg:col-span-2" : "lg:col-span-3"}>
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2
                    className="animate-spin text-[var(--primary)]"
                    size={40}
                  />
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-20 glass-panel rounded-3xl">
                  <div className="w-20 h-20 bg-[var(--surface-alt)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--primary)]">
                    <MapPin size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">
                    No addresses found
                  </h3>
                  <p className="text-gray-500 mt-2 mb-8">
                    Add a new address to speed up your checkout process.
                  </p>
                  {!isFormOpen && (
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="btn-primary"
                    >
                      Add Your First Address
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((addr, idx) => (
                    <div
                      key={addr.id}
                      className={`relative group p-6 rounded-3xl border transition-all duration-300 animate-slide-up ${
                        addr.isDefault
                          ? "bg-[var(--surface)] border-[var(--primary)] shadow-glow"
                          : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary-light)] hover:shadow-lg"
                      }`}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {addr.isDefault && (
                        <div className="absolute top-4 right-4 bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <CheckCircle size={12} /> Default
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--surface-alt)] flex items-center justify-center text-[var(--primary)] shrink-0">
                          <Home size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[var(--foreground)]">
                            {addr.name}
                          </h3>
                          <p className="text-sm text-gray-500">{addr.phone}</p>
                        </div>
                      </div>

                      <div className="space-y-1 text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                        <p>{addr.address1}</p>
                        {addr.address2 && <p>{addr.address2}</p>}
                        <p>
                          {addr.city}, {addr.district}
                        </p>
                        <p>
                          {addr.state} -{" "}
                          <span className="font-semibold">{addr.pincode}</span>
                        </p>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-[var(--border)]">
                        <button
                          onClick={() => editAddress(addr)}
                          className="flex-1 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-alt)] transition-colors flex items-center justify-center gap-2"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefault(addr.id)}
                            className="flex-1 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-alt)] transition-colors flex items-center justify-center gap-2"
                          >
                            <CheckCircle size={16} /> Set Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete Address"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
