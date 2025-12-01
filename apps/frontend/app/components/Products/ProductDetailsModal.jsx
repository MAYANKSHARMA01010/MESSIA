"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, Check, AlertCircle } from "lucide-react";

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset active image when product changes
  useEffect(() => {
    if (product) setActiveImage(0);
  }, [product]);

  if (!isOpen || !product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://placehold.co/600x800?text=No+Image"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900 flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:bg-white hover:text-gray-900 transition-colors backdrop-blur-sm dark:bg-black/50 dark:text-gray-300 dark:hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Image Gallery Section */}
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 relative flex flex-col">
          <div className="relative flex-1 h-64 md:h-auto overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto bg-white/50 dark:bg-black/20 backdrop-blur-sm absolute bottom-0 w-full">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    activeImage === idx
                      ? "border-pink-600 ring-2 ring-pink-600/20"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-pink-600 uppercase tracking-wider">
                {product.category?.name || "Exclusive"}
              </h4>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white font-serif">
                {product.name}
              </h2>
              <div className="mt-4 flex items-baseline gap-4">
                <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </p>
                {product.stock > 0 ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full dark:bg-green-900/30">
                    <Check size={14} /> In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full dark:bg-red-900/30">
                    <AlertCircle size={14} /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <button
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium text-lg hover:bg-pink-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stock <= 0}
              >
                <ShoppingBag size={20} />
                {product.stock > 0 ? "Add to Cart" : "Currently Unavailable"}
              </button>
              <p className="mt-4 text-center text-xs text-gray-400">
                Free shipping on orders over $100 • 30-day return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
