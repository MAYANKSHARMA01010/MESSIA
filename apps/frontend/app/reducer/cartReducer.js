export const initialCartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartReducer = (state, action) => {
  switch (action.type) {

    // Add item
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (i) => i.id === action.payload.id
      );

      let updatedItems;

      if (existing) {
        updatedItems = state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        updatedItems = [
          ...state.items,
          { ...action.payload, quantity: 1 },
        ];
      }

      return recalc({ ...state, items: updatedItems });
    }

    // Increase quantity
    case "INCREASE_QTY": {
      const updatedItems = state.items.map((i) =>
        i.id === action.payload
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );

      return recalc({ ...state, items: updatedItems });
    }

    // Decrease quantity
    case "DECREASE_QTY": {
      const updatedItems = state.items
        .map((i) =>
          i.id === action.payload
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0);

      return recalc({ ...state, items: updatedItems });
    }

    // Remove item
    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter(
        (i) => i.id !== action.payload
      );

      return recalc({ ...state, items: updatedItems });
    }

    // Clear entire cart
    case "CLEAR_CART": {
      return initialCartState;
    }

    default:
      return state;
  }
};

// Totals calculator
const recalc = (state) => {
  let totalItems = 0;
  let totalPrice = 0;

  state.items.forEach((i) => {
    totalItems += i.quantity;
    totalPrice += i.quantity * i.price;
  });

  return {
    ...state,
    totalItems,
    totalPrice,
  };
};
