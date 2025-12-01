const express = require("express");
const productRouter = express.Router();

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

// Public Routes
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

// Admin Routes
productRouter.post(
  "/",
  authenticate,
  verifyAdmin,
  validateProduct,
  createProduct
);
productRouter.put("/:id", authenticate, verifyAdmin, updateProduct);
productRouter.delete("/:id", authenticate, verifyAdmin, deleteProduct);

module.exports = productRouter;
