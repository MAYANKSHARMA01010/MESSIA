"use client";

import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import { cartReducer, initialCartState } from "../reducer/cartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,

        // ADD
        addToCart: (item) => {
          dispatch({
            type: "ADD_TO_CART",
            payload: item,
          });

          toast.success(`${item.name} added to cart 🛒`);
        },

        // INCREASE
        increaseQty: (id) => {
          dispatch({
            type: "INCREASE_QTY",
            payload: id,
          });

          toast("Quantity increased ➕");
        },

        // DECREASE
        decreaseQty: (id) => {
          dispatch({
            type: "DECREASE_QTY",
            payload: id,
          });

          toast("Quantity decreased ➖");
        },

        // REMOVE
        removeFromCart: (id) => {
          dispatch({
            type: "REMOVE_FROM_CART",
            payload: id,
          });

          toast.error("Item removed from cart ❌");
        },

        // CLEAR
        clearCart: () => {
          dispatch({
            type: "CLEAR_CART",
          });

          toast.error("Cart cleared 🗑️");
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
