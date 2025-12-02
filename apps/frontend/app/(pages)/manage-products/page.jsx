"use client";
import { useEffect, useState } from "react";
import { adminProductAPI, categoryAPI } from "../../utils/api";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
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
  const fetchProducts = async (currentPage, shouldReset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      let sortBy = "createdAt";
      let order = "desc";
      if (sort === "price-low") {
        sortBy = "price";
        order = "asc";
      } else if (sort === "price-high") {
        sortBy = "price";
        order = "desc";
      }
      const res = await adminProductAPI.list({
        page: currentPage,
        limit: 30,
        search,
        sortBy,
        order,
      });
      const newProducts = res.data.products;
      if (shouldReset) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => String(p.id)));
          const uniqueNew = newProducts.filter(
            (p) => !existingIds.has(String(p.id))
          );
          return [...prev, ...uniqueNew];
        });
      }
      setHasMore(newProducts.length === 30);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  const loadCategories = async () => {
    try {
      const res = await categoryAPI.list();
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [search, sort]);
  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => {
            const nextPage = prev + 1;
            fetchProducts(nextPage, false);
            return nextPage;
          });
        }
      },
      { threshold: 1.0 }
    );
    const sentinel = document.getElementById("sentinel");
    if (sentinel) observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, loading]);
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
  if (loading) return <div className="p-10">Loading admin panel...</div>;
  return (
    <>
      <div className="min-h-screen bg-[var(--background)] pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        {}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif font-bold text-[var(--foreground)]">
            Manage Products
          </h1>
          <button
            onClick={openCreate}
            className="btn-primary px-6 py-2.5 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            + Add Product
          </button>
        </div>
        {}
        <div className="flex gap-4 mb-8">
          <input
            className="border border-[var(--border)] px-4 py-2.5 w-64 rounded-full bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-[var(--border)] px-4 py-2.5 rounded-full bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price (Low → High)</option>
            <option value="price-high">Price (High → Low)</option>
          </select>
        </div>
        {}
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--surface-alt)] text-[var(--foreground)] font-serif uppercase tracking-wider text-xs">
              <tr className="[&>th]:p-4">
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--surface)] divide-y divide-[var(--border)]">
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-[var(--surface-alt)] transition-colors [&>td]:p-4 text-[var(--foreground)]"
                >
                  <td className="font-mono text-gray-500 dark:text-gray-400">
                    {p.id}
                  </td>
                  <td className="font-medium">{p.name}</td>
                  <td>{p.category?.name || "-"}</td>
                  <td className="font-bold text-[var(--primary)]">
                    ₹{p.price}
                  </td>
                  <td>{p.stock}</td>
                  <td>
                    {p.isVisible ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Visible
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Hidden
                      </span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-alt)] hover:text-[var(--primary)] transition-colors"
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        p.isVisible
                          ? "text-red-600 border-red-200 hover:bg-red-50"
                          : "text-green-600 border-green-200 hover:bg-green-50"
                      }`}
                      onClick={() => toggleVisibility(p)}
                    >
                      {p.isVisible ? "Hide" : "Show"}
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {}
              <tr id="sentinel">
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  {loading && "Loading more products..."}
                  {!hasMore && products.length > 0 && "End of list"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[var(--surface)] p-8 w-[480px] space-y-5 rounded-3xl shadow-2xl animate-scale-in">
              <h2 className="font-serif font-bold text-2xl text-[var(--foreground)]">
                {editProduct ? "Edit Product" : "Create Product"}
              </h2>
              <input
                className="input-premium w-full"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <textarea
                className="input-premium w-full min-h-[100px]"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="input-premium w-full"
                  placeholder="Price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <input
                  className="input-premium w-full"
                  placeholder="Stock"
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>
              {}
              <select
                className="input-premium w-full"
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
              {}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {form.images.map((img, i) => (
                  <input
                    key={i}
                    className="input-premium w-full text-sm"
                    placeholder={`Image URL ${i + 1}`}
                    value={img}
                    onChange={(e) => {
                      const copy = [...form.images];
                      copy[i] = e.target.value;
                      setForm({ ...form, images: copy });
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setForm({ ...form, images: [...form.images, ""] })
                }
                className="text-sm text-[var(--primary)] hover:underline font-medium"
              >
                + Add another image
              </button>
              <label className="flex gap-3 items-center p-3 rounded-xl bg-[var(--surface-alt)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isVisible}
                  onChange={(e) =>
                    setForm({ ...form, isVisible: e.target.checked })
                  }
                  className="w-5 h-5 text-[var(--primary)] rounded focus:ring-[var(--primary)]"
                />
                <span className="font-medium text-[var(--foreground)]">
                  Visible to customers
                </span>
              </label>
              <div className="flex justify-between pt-4 gap-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-alt)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={submitForm}
                  className="flex-1 btn-primary py-3"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
