const express = require("express");
const {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController.js");
const { authenticate } = require("../utils/auth.js");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Apply rate limiting to all address routes to mitigate DoS attacks
const addressLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs for these routes
});

router.use(authenticate);
router.use(addressLimiter);
router.get("/", getAddresses);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);
router.patch("/:id/default", setDefaultAddress);
module.exports = router;
