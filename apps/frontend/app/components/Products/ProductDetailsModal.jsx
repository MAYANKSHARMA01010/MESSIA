"use client";
import React, { useEffect, useState } from "react";
import { X, ShoppingBag, Check, AlertCircle, Plus, Minus } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
export default function ProductDetailsModal({ product, isOpen, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const itemInCart = cart.find((i) => i.productId === product?.id);
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  useEffect(() => {
    if (product) setActiveImage(0);
  }, [product]);
  if (!isOpen || !product) return null;
  const images = product.images?.length > 0 ? product.images : [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl rounded-3xl bg-[var(--surface)] shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-[var(--surface)]/80 p-2 text-gray-500 dark:text-gray-400 hover:text-[var(--foreground)] transition hover:bg-[var(--surface)] shadow-sm"
        >
          <X size={24} />
        </button>
        <div className="w-full md:w-1/2 bg-[var(--surface-alt)] flex flex-col relative">
          <div className="flex-1 overflow-hidden relative group">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 p-4 bg-white/50 dark:bg-black/30 absolute bottom-0 w-full overflow-x-auto backdrop-blur-md no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImage === idx
                      ? "border-[var(--primary)] ring-2 ring-[var(--primary-light)] scale-105"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase text-[var(--primary)] tracking-widest font-medium mb-2">
                {product.category?.name || "Exclusive"}
              </p>
              <h2 className="text-4xl font-serif font-bold text-[var(--foreground)] leading-tight">
                {product.name}
              </h2>
              <div className="mt-6 flex items-center gap-6">
                <p className="text-3xl font-bold text-[var(--primary)]">
                  ₹{product.price.toFixed(2)}
                </p>
                {product.stock > 0 ? (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-full">
                    <Check size={16} /> In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-full">
                    <AlertCircle size={16} /> Out of Stock
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light">
              {product.description}
            </p>
            <div className="pt-8 border-t border-[var(--border)]">
              {!itemInCart && (
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={22} />
                  Add to Cart
                </button>
              )}
              {itemInCart && (
                <div className="flex items-center justify-center gap-8 bg-[var(--surface-alt)] p-4 rounded-2xl border border-[var(--border)]">
                  <button
                    onClick={() => decreaseQty(product.id)}
                    className="p-3 rounded-xl bg-[var(--surface)] shadow-sm hover:text-[var(--primary)] hover:shadow-md transition-all"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="text-3xl font-bold text-[var(--foreground)]">
                    {itemInCart.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(product.id)}
                    className="p-3 rounded-xl bg-[var(--surface)] shadow-sm hover:text-[var(--primary)] hover:shadow-md transition-all"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-2">
              <Check size={14} className="text-[var(--primary)]" /> Free
              shipping on orders over ₹1000
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <Check size={14} className="text-[var(--primary)]" /> 30-day
              returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
