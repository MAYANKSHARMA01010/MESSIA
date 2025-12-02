"use client";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

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
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
          <ShoppingBag size={48} className="text-gray-300" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500">Add some products to start shopping.</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">
              {totalItems} item{totalItems > 1 && "s"}
            </p>
          </div>

          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <Trash2 size={16} />
            Clear Cart
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border p-4 bg-white shadow-sm"
              >
                <div className="relative w-[100px] min-w-[100px] h-[130px] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={
                      item.image ||
                      "https://dummyimage.com/300x300/f3f4f6/9ca3af&text=No+Image"
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="font-medium leading-tight">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-lg">
                      <button onClick={() => decreaseQty(item.productId)}>
                        <Minus size={18} />
                      </button>

                      <span className="font-semibold min-w-[24px] text-center">
                        {item.quantity}
                      </span>

                      <button onClick={() => increaseQty(item.productId)}>
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="flex gap-1 items-center text-xs text-red-600 hover:text-red-700 ml-auto"
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

          <div className="rounded-2xl border p-6 bg-gray-50 h-fit space-y-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p>Total items</p>
                <p>{totalItems}</p>
              </div>

              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="text-green-600">Free</p>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-600 transition">
              <ShoppingBag size={18} />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
