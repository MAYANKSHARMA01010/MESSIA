"use client";

import { useEffect, useState } from "react";
import { adminProductAPI, categoryAPI } from "../../utils/api";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const emptyForm = {
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    images: [""],
    isVisible: true,
  };

  const [form, setForm] = useState(emptyForm);

  /* ================= LOAD DATA ================= */

  const loadProducts = async () => {
    try {
      const res = await adminProductAPI.list();
      let list = res.data.products;

      if (search) {
        list = list.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (sort === "price-low") list.sort((a, b) => a.price - b.price);
      else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
      else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setProducts(list);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const loadCategories = async () => {
    try {
      const res = await categoryAPI.list();
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([loadProducts(), loadCategories()]);
      setLoading(false);
    })();
  }, [search, sort]);

  /* ================= CRUD ================= */

  const openCreate = () => {
    setForm(emptyForm);
    setEditProduct(null);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      categoryId: p.categoryId,
      images: p.images.length ? p.images : [""],
      isVisible: p.isVisible,
    });
    setShowForm(true);
  };

  const submitForm = async () => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
        images: form.images.filter(Boolean),
        isVisible: form.isVisible,
      };

      if (editProduct) {
        await adminProductAPI.update(editProduct.id, payload);
      } else {
        await adminProductAPI.create(payload);
      }

      setShowForm(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product permanently?")) return;

    try {
      await adminProductAPI.remove(id);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const toggleVisibility = async (p) => {
    try {
      await adminProductAPI.update(p.id, {
        isVisible: !p.isVisible,
      });
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  /* ================= RENDER ================= */

  if (loading) return <div className="p-10">Loading admin panel...</div>;

  return (
    <>
      <Navbar />
      <div className="p-10 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <button
            onClick={openCreate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>

        {/* FILTER BAR */}
        <div className="flex gap-4">
          <input
            className="border px-4 py-2 w-64"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-4 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price (Low → High)</option>
            <option value="price-high">Price (High → Low)</option>
          </select>
        </div>

        {/* TABLE */}
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr className="[&>th]:p-2 text-left">
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>₹ Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="w-[180px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t [&>td]:p-2">
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category?.name || "-"}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  {p.isVisible ? (
                    <span className="text-green-600">Visible</span>
                  ) : (
                    <span className="text-red-600">Hidden</span>
                  )}
                </td>

                <td className="flex gap-2">
                  <button
                    className="border px-2 py-1"
                    onClick={() => openEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    className={`border px-2 py-1 ${
                      p.isVisible
                        ? "text-red-600 border-red-200 hover:bg-red-50"
                        : "text-green-600 border-green-200 hover:bg-green-50"
                    }`}
                    onClick={() => toggleVisibility(p)}
                  >
                    {p.isVisible ? "Hide" : "Show"}
                  </button>

                  <button
                    className="border px-2 py-1 text-red-600"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 w-[420px] space-y-3">
              <h2 className="font-bold">
                {editProduct ? "Edit Product" : "Create Product"}
              </h2>

              <input
                className="border px-3 py-2 w-full"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <textarea
                className="border px-3 py-2 w-full"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                className="border px-3 py-2 w-full"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input
                className="border px-3 py-2 w-full"
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />

              {/* CATEGORY DROPDOWN */}
              <select
                className="border px-3 py-2 w-full"
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* IMAGES ARRAY */}
              {form.images.map((img, i) => (
                <input
                  key={i}
                  className="border px-3 py-2 w-full"
                  placeholder={`Image URL ${i + 1}`}
                  value={img}
                  onChange={(e) => {
                    const copy = [...form.images];
                    copy[i] = e.target.value;
                    setForm({ ...form, images: copy });
                  }}
                />
              ))}

              <button
                onClick={() =>
                  setForm({ ...form, images: [...form.images, ""] })
                }
                className="text-sm underline"
              >
                + Add another image
              </button>

              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.isVisible}
                  onChange={(e) =>
                    setForm({ ...form, isVisible: e.target.checked })
                  }
                />
                Visible
              </label>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={submitForm}
                  className="bg-black text-white px-4 py-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
