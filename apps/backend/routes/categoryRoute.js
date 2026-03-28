const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");
const { authenticate } = require("../utils/auth");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// Rate limiter for category modification routes to mitigate abuse/DoS
const categoryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 write requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.get("/", getAllCategories);
router.post("/", categoryLimiter, authenticate, verifyAdmin, createCategory);
router.put("/:id", categoryLimiter, authenticate, verifyAdmin, updateCategory);
router.delete("/:id", categoryLimiter, authenticate, verifyAdmin, deleteCategory);
module.exports = router;
