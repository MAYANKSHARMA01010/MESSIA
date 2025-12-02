const express = require("express");
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const { authenticate } = require("../utils/auth");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

const router = express.Router();

/* ---------- PUBLIC ROUTES ---------- */
router.get("/", getAllCategories);

/* ---------- ADMIN ROUTES ---------- */
router.post("/", authenticate, verifyAdmin, createCategory);
router.put("/:id", authenticate, verifyAdmin, updateCategory);
router.delete("/:id", authenticate, verifyAdmin, deleteCategory);

module.exports = router;
