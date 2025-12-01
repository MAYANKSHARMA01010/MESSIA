"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Loader2, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../utils/api";

// Components
import ProductCard from "../../components/Products/ProductCard";
import ProductDetailsModal from "../../components/Products/ProductDetailsModal";
import FilterBar from "../../components/Products/FilterBar";
import Navbar from "@/app/components/Navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASE_URL = API_BASE_URL;

  // Mock Categories (Ideally fetch from backend)
  const categories = [
    { id: 1, name: "Scented Candles" },
    { id: 2, name: "Gift Sets" },
    { id: 3, name: "Accessories" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      const url = isAdmin
        ? `${BASE_URL}/products?showHidden=true`
        : `${BASE_URL}/products`;

      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Wait for animation
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    // 2. Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // 3. Sort
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // Assuming higher ID is newer for now, or use createdAt if available
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
          <p className="text-gray-500 animate-pulse">Curating collection...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
          The Collection
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          Discover our handcrafted selection of premium candles and accessories,
          designed to elevate your space.
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

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
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
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
    </>
  );
}
