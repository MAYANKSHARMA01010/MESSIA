const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController.js");
const { authenticate } = require("../utils/auth.js");

// Apply rate limiting to all address routes to mitigate DoS attacks
const addressLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs for these routes
});

router.use(addressLimiter);
router.use(authenticate);
router.get("/", getAddresses);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);
router.patch("/:id/default", setDefaultAddress);

module.exports = router;
