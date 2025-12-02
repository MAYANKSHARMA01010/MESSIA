"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { productAPI, categoryAPI } from "../../utils/api";

import ProductCard from "../../components/Products/ProductCard";
import ProductDetailsModal from "../../components/Products/ProductDetailsModal";
import FilterBar from "../../components/Products/FilterBar";
import Navbar from "@/app/components/Navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= FETCH DATA ================= */

  const fetchProducts = async (currentPage, shouldReset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      let sortField = "createdAt";
      let order = "desc";

      switch (sortBy) {
        case "price_asc":
          sortField = "price";
          order = "asc";
          break;
        case "price_desc":
          sortField = "price";
          order = "desc";
          break;
        case "name_asc":
          sortField = "name";
          order = "asc";
          break;
        case "newest":
        default:
          sortField = "createdAt";
          order = "desc";
          break;
      }

      const params = {
        page: currentPage,
        limit: 12, // Load 12 at a time for grid layout
        search: searchQuery,
        sortBy: sortField,
        order,
        categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
        showHidden: isAdmin ? "true" : undefined,
      };

      const res = await productAPI.list(params);
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

      setHasMore(newProducts.length === 12);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoryAPI.list();
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy, selectedCategory, isAdmin]);

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
      { threshold: 0.5 }
    );

    const sentinel = document.getElementById("product-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, loading]);

  /* ================= HANDLERS ================= */

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
            The Collection
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Discover our handcrafted selection of premium candles and
            accessories, designed to elevate your space.
          </p>

          {isAdmin && (
            <div className="mt-8">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-600/20"
              >
                <Plus size={20} />
                Add New Product
              </Link>
            </div>
          )}
        </div>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {products.length === 0 && !loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 dark:bg-gray-800">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No products found
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-6 text-pink-600 hover:text-pink-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}

          {/* SENTINEL FOR INFINITE SCROLL */}
          <div
            id="product-sentinel"
            className="h-20 flex justify-center items-center mt-8"
          >
            {loading && (
              <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
            )}
            {!hasMore && products.length > 0 && (
              <p className="text-gray-500 dark:text-gray-400">
                You've reached the end of the collection.
              </p>
            )}
          </div>
        </div>

        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </>
  );
}
