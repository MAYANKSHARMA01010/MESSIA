const express = require("express");
const productRouter = express.Router();
const rateLimit = require("express-rate-limit");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authenticate } = require("../utils/auth");
const { verifyAdmin } = require("../middlewares/adminMiddleware");
const { validateProduct } = require("../middlewares/productMiddleware");

const productLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs for product modifications
});

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", productLimiter, authenticate, verifyAdmin, validateProduct, createProduct);
productRouter.put("/:id", productLimiter, authenticate, verifyAdmin, updateProduct);
productRouter.delete("/:id", productLimiter, authenticate, verifyAdmin, deleteProduct);
module.exports = productRouter;
