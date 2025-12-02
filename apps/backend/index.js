const express = require("express");
const corsMiddleware = require("./config/cors.js");
const authRouter = require("./routes/authRoute.js");
const productRouter = require("./routes/productRoute.js");
const cartRouter = require("./routes/cartRoute.js");
const addressRouter = require("./routes/addressRoutes.js"); // ✅ IMPORT

require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 5001;

app.use(corsMiddleware);
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter); // ✅ USE ROUTER

/* ---------------- ROOT ------------------ */
app.get("/", (req, res) => {
  res.status(200).send("<h1>Backend Running Successfully 🚀</h1>");
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Local Backend URL: ${process.env.BACKEND_LOCAL_URL}`);
  console.log(`✅ Deployed Backend URL: ${process.env.BACKEND_SERVER_URL}`);
});
