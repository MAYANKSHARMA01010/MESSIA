"use client";
import React from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
export default function ProductCard({ product, onClick }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const item = cart.find((i) => i.productId === product.id);
  return (
    <div className="group animate-scale-in product-card" style={product.style}>
      <div
        className="cursor-pointer aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--surface-alt)] relative"
        onClick={() => onClick(product)}
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="mt-4 px-2 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-[var(--foreground)] text-lg leading-tight group-hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>
          <p className="font-bold text-[var(--primary)] text-lg">
            ₹{product.price}
          </p>
        </div>
        {!item && (
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full btn-primary flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        )}
        {item && (
          <div className="mt-4 flex justify-center items-center gap-4 bg-[var(--surface-alt)] py-2 rounded-full border border-[var(--border)]">
            <button
              onClick={() => decreaseQty(product.id)}
              className="p-1 hover:text-[var(--primary)] transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="font-bold text-[var(--foreground)]">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQty(product.id)}
              className="p-1 hover:text-[var(--primary)] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
