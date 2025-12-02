const express = require("express");
const {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController.js");

const { authenticate } = require("../utils/auth.js");

const router = express.Router();

/* ------------------ PROTECTED ROUTES ------------------ */
router.use(authenticate);

/* ------------------------ CRUD ------------------------ */
router.get("/", getAddresses);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

/* -------------------- SET DEFAULT --------------------- */
router.patch("/:id/default", setDefaultAddress);

module.exports = router;
