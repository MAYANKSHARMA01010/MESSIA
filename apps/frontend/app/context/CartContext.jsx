"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { cartAPI } from "../utils/api";
export const initialCartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        totalPrice: action.payload.totalPrice || 0,
      };
    case "CLEAR_CART":
      return initialCartState;
    default:
      return state;
  }
};
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const { token, isLoggedIn } = useAuth();
  const loadCart = async () => {
    if (!token) return;
    try {
      const res = await cartAPI.get();
      dispatch({
        type: "SET_CART",
        payload: res.data,
      });
    } catch (err) {
      console.error("LOAD CART ERROR:", err);
      toast.error("Failed to load cart");
    }
  };
  useEffect(() => {
    if (isLoggedIn) loadCart();
    else dispatch({ type: "CLEAR_CART" });
  }, [token]);
  const addToCart = async (product) => {
    try {
      const res = await cartAPI.add({ productId: product.id });
      dispatch({
        type: "SET_CART",
        payload: res.data,
      });
      toast.success(`${product.name} added to cart 🛒`);
    } catch (err) {
      console.error("ADD CART:", err);
      toast.error("Failed to add to cart");
    }
  };
  const increaseQty = async (productId) => {
    try {
      const item = state.items.find(
        (i) => i.productId === productId
      );
      if (!item) return;
      await cartAPI.update({
        productId,
        quantity: item.quantity + 1,
      });
      await loadCart();
      toast("Quantity increased ➕");
    } catch (err) {
      console.error("INC QTY:", err);
      toast.error("Failed to update quantity");
    }
  };
  const decreaseQty = async (productId) => {
    try {
      const item = state.items.find(
        (i) => i.productId === productId
      );
      if (!item) return;
      if (item.quantity === 1) {
        await removeFromCart(productId);
        return;
      }
      await cartAPI.update({
        productId,
        quantity: item.quantity - 1,
      });
      await loadCart();
      toast("Quantity decreased ➖");
    } catch (err) {
      console.error("DEC QTY:", err);
      toast.error("Failed to update quantity");
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const res = await cartAPI.remove(productId);
      dispatch({
        type: "SET_CART",
        payload: res.data,
      });
      toast.error("Item removed ❌");
    } catch (err) {
      console.error("REMOVE CART:", err);
      toast.error("Failed to remove item");
    }
  };
  const clearCart = async () => {
    try {
      const res = await cartAPI.clear();
      dispatch({
        type: "SET_CART",
        payload: res.data,
      });
      toast.error("Cart cleared 🗑️");
    } catch (err) {
      console.error("CLEAR CART:", err);
      toast.error("Failed to clear cart");
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
