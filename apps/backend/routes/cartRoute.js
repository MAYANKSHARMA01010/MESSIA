const express = require("express");
const cartRouter = express.Router();
const RateLimit = require("express-rate-limit");
const {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart,
} = require("../controllers/cartController");
const { authenticate } = require("../utils/auth");

const cartRateLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 cart requests per windowMs
});

cartRouter.use(cartRateLimiter);

cartRouter.get("/", authenticate, getCart);
cartRouter.post("/add", authenticate, addToCart);
cartRouter.put("/update", authenticate, updateQty);
cartRouter.delete("/item/:productId", authenticate, removeItem);
cartRouter.delete("/clear", authenticate, clearCart);
module.exports = cartRouter;
