"use client";
import React, { useEffect, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { productAPI, categoryAPI } from "../../utils/api";
import ProductCard from "../../components/Products/ProductCard";
import ProductDetailsModal from "../../components/Products/ProductDetailsModal";
import FilterBar from "../../components/Products/FilterBar";

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
        limit: 12,
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
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
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
      <div className="min-h-screen bg-[var(--background)] no-scrollbar">
        <div className="bg-[var(--surface)] pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[var(--border)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-[var(--foreground)] mb-6 animate-fade-in">
              The Collection
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-light leading-relaxed animate-slide-up">
              Discover our handcrafted selection of premium candles and
              accessories, designed to elevate your space.
            </p>
            {isAdmin && (
              <div className="mt-10 animate-scale-in">
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-8 py-3 text-[var(--background)] hover:bg-[var(--primary)] transition-all shadow-lg hover:shadow-glow"
                >
                  <Plus size={20} />
                  Add New Product
                </Link>
              </div>
            )}
          </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {products.length === 0 && !loading ? (
            <div className="text-center py-24 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--surface-alt)] mb-6 shadow-inner">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-[var(--foreground)]">
                No products found
              </h3>
              <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-8 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium hover:underline transition-all"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                  style={{ animationDelay: `${idx * 50}ms` }}
                />
              ))}
            </div>
          )}
          {}
          <div
            id="product-sentinel"
            className="h-24 flex justify-center items-center mt-12"
          >
            {loading && (
              <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
            )}
            {!hasMore && products.length > 0 && (
              <p className="text-gray-400 dark:text-gray-500 font-light italic">
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
