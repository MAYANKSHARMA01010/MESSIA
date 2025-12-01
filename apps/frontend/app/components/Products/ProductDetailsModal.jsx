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

  const images =
    product.images?.length > 0
      ? product.images
      : ["https://placehold.co/600x800?text=No+Image"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl dark:bg-gray-900 flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:text-gray-900 transition dark:bg-black/50 dark:text-gray-300"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 flex flex-col relative">
          <div className="flex-1 overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 p-4 bg-white/50 dark:bg-black/30 absolute bottom-0 w-full overflow-x-auto backdrop-blur-sm">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                    activeImage === idx
                      ? "border-pink-600 ring-2 ring-pink-600/20"
                      : "border-transparent hover:border-gray-300"
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

        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase text-pink-600 tracking-wide">
                {product.category?.name || "Exclusive"}
              </p>

              <h2 className="text-3xl font-serif font-bold mt-2">
                {product.name}
              </h2>

              <div className="mt-4 flex items-center gap-4">
                <p className="text-3xl font-semibold">
                  ₹{product.price.toFixed(2)}
                </p>

                {product.stock > 0 ? (
                  <span className="flex items-center gap-1 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <Check size={14} /> In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    <AlertCircle size={14} /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>

            <div className="pt-6 border-t">
              {!itemInCart && (
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="w-full bg-gray-900 py-4 rounded-xl flex items-center justify-center gap-2 text-white hover:bg-pink-600 transition-all disabled:opacity-40"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
              )}

              {itemInCart && (
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => decreaseQty(product.id)}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Minus size={20} />
                  </button>

                  <span className="text-2xl font-semibold">
                    {itemInCart.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(product.id)}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-gray-400">
              Free shipping on orders over ₹1000 • 30-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
