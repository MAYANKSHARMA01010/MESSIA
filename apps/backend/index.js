const express = require("express");
const corsMiddleware = require("./config/cors.js");
const authRouter = require("./routes/authRoute.js");
const productRouter = require("./routes/productRoute.js");
const cartRouter = require("./routes/cartRoute.js");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(corsMiddleware);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Backend Running Successfully 🚀</h1>");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Local Backend URL: ${process.env.BACKEND_LOCAL_URL}`);
  console.log(`✅ Deployed Backend URL: ${process.env.BACKEND_SERVER_URL}`);
});
