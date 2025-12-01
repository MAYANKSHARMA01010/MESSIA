"use client";

import React from "react";
import { Eye, ShoppingBag } from "lucide-react";

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 relative">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://placehold.co/600x800?text=No+Image"
          }
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="rounded-full bg-white p-3 text-gray-900 shadow-lg hover:bg-pink-50 transition-colors">
            <Eye size={20} />
          </button>
        </div>

        {/* Badges */}
        {!product.isVisible && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
              Hidden
            </span>
          </div>
        )}
        {product.stock <= 0 && (
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-red-500/90 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {product.category?.name || "Collection"}
            </p>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
