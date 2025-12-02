"use client";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const {
    cart,
    totalItems,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!cart.length)
    return (
      <>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
          <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add some products to start shopping.
          </p>
        </div>
      </>
    );

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-24 space-y-10 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-end border-b border-[var(--border)] pb-6">
          <div>
            <h1 className="text-4xl font-serif font-bold tracking-tight text-[var(--foreground)]">
              Shopping Cart
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              {totalItems} item{totalItems > 1 && "s"} in your bag
            </p>
          </div>

          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-full transition-all"
          >
            <Trash2 size={16} />
            Clear Cart
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            {cart.map((item, idx) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative w-[120px] min-w-[120px] h-[150px] rounded-2xl overflow-hidden bg-[var(--surface-alt)] shadow-inner">
                  <Image
                    src={
                      item.image ||
                      "https://dummyimage.com/300x300/f3f4f6/9ca3af?text=No+Image"
                    }
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[var(--foreground)] leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[var(--primary)] font-medium mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 bg-[var(--surface-alt)] px-4 py-2 rounded-full border border-[var(--border)]">
                      <button
                        onClick={() => decreaseQty(item.productId)}
                        className="hover:text-[var(--primary)] transition-colors"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-bold min-w-[20px] text-center text-[var(--foreground)]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.productId)}
                        className="hover:text-[var(--primary)] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-bold text-lg text-[var(--foreground)]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="flex gap-1 items-center text-xs text-red-500 hover:text-red-700 ml-auto transition-colors"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-3xl p-8 h-fit space-y-8 sticky top-24">
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="text-green-600 font-medium">Free</p>
              </div>

              <div className="border-t border-[var(--border)] pt-4 flex justify-between font-bold text-xl text-[var(--foreground)]">
                <p>Total</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <button className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-glow">
              <ShoppingBag size={20} />
              Proceed to Checkout
            </button>

            <p className="text-xs text-center text-gray-400">
              Secure Checkout • Free Returns
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
