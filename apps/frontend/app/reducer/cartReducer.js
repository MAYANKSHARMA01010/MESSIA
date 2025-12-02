export const initialCartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId   
      );
      let updatedItems;
      if (existing) {
        updatedItems = state.items.map((i) =>
          i.productId === action.payload.productId
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
    case "INCREASE_QTY": {
      const updatedItems = state.items.map((i) =>
        i.productId === action.payload
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      return recalc({ ...state, items: updatedItems });
    }
    case "DECREASE_QTY": {
      const updatedItems = state.items
        .map((i) =>
          i.productId === action.payload
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(Boolean)
        .filter((i) => i.quantity > 0);
      return recalc({ ...state, items: updatedItems });
    }
    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter(
        (i) => i.productId !== action.payload
      );
      return recalc({ ...state, items: updatedItems });
    }
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
