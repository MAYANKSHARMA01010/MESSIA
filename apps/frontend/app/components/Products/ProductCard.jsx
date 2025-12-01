"use client";

import React from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function ProductCard({ product, onClick }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const item = cart.find((i) => i.productId === product.id);

  return (
    <div className="group">
      <div
        className="cursor-pointer aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100"
        onClick={() => onClick(product)}
      >
        <img
          src={product.images?.[0] || "https://placehold.co/600x800"}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-110"
        />
      </div>

      <div className="mt-3">
        <div className="flex justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <p className="font-semibold">₹{product.price}</p>
        </div>

        {!item && (
          <button
            onClick={() => addToCart(product)}
            className="mt-3 w-full bg-gray-900 py-2 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 transition"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        )}

        {item && (
          <div className="mt-3 flex justify-center items-center gap-4 bg-gray-100 py-2 rounded-lg">
            <button onClick={() => decreaseQty(product.id)}>
              <Minus size={18} />
            </button>

            <span className="font-bold">{item.quantity}</span>

            <button onClick={() => increaseQty(product.id)}>
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
