"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { API_BASE_URL } from "../../utils/api";

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  const BASE_URL = API_BASE_URL;

  useEffect(() => {
    if (!loading) {
      if (!isAdmin) {
        router.push("/");
      } else {
        fetchProducts();
      }
    }
  }, [loading, isAdmin, router]);

  const fetchProducts = async () => {
    try {
      // Admin wants to see all products, including hidden ones
      const response = await axios.get(`${BASE_URL}/products?showHidden=true`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setFetching(false);
    }
  };

  const toggleVisibility = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/products/${id}`,
        { isVisible: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("Error toggling visibility:", error);
      alert("Failed to update visibility");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (loading || fetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
          <table className="w-full border-collapse text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      {product.category?.name || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          product.isVisible
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {product.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            toggleVisibility(product.id, product.isVisible)
                          }
                          className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                          title={
                            product.isVisible ? "Hide Product" : "Show Product"
                          }
                        >
                          {product.isVisible ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="rounded p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-blue-300"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-800 dark:text-red-400 dark:hover:bg-gray-700 dark:hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
