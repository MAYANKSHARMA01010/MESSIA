const express = require("express");
const cartRouter = express.Router();
const {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart,
} = require("../controllers/cartController");
const { authenticate } = require("../utils/auth");
cartRouter.get("/", authenticate, getCart);
cartRouter.post("/add", authenticate, addToCart);
cartRouter.put("/update", authenticate, updateQty);
cartRouter.delete("/item/:productId", authenticate, removeItem);
cartRouter.delete("/clear", authenticate, clearCart);
module.exports = cartRouter;
