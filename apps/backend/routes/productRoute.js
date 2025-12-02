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

/* ---------- PUBLIC ROUTES ---------- */
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

/* ---------- ADMIN ROUTES ---------- */
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
