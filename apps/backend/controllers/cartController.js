const { prisma } = require("../config/database");

/* ================================
   HELPERS
================================ */
const calculateAndSend = (res, items) => {
  let totalItems = 0;
  let totalPrice = 0;

  items.forEach((item) => {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  return res.json({ items, totalItems, totalPrice });
};

const buildCartResponse = async (userId, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.json({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }

    const items = cart.items.map((i) => ({
      id: i.id,
      productId: i.productId,
      name: i.product.name,
      price: i.product.price,
      image: i.product?.images?.[0] || null,
      quantity: i.quantity,
    }));

    return calculateAndSend(res, items);
  } catch (err) {
    console.error("===== BUILD CART ERROR =====");
    console.error(err);
    console.error("MESSAGE:", err.message);
    console.error("META:", err.meta || null);

    return res.status(500).json({
      message: "Failed to build cart",
      dbError: err.message,
      meta: err.meta || null,
    });
  }
};

/* ================================
   GET CART
================================ */
const getCart = async (req, res) => {
  try {
    const userId = Number(req.user.id); 
    return await buildCartResponse(userId, res);
  } catch (err) {
    console.error("===== GET CART ERROR =====");
    console.error(err);
    console.error("MESSAGE:", err.message);
    console.error("META:", err.meta || null);

    res.status(500).json({
      message: "Failed to fetch cart",
      dbError: err.message,
      meta: err.meta || null,
    });
  }
};

/* ================================
   ADD TO CART
================================ */
const addToCart = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const productId = Number(req.body.productId);

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });

    return await buildCartResponse(userId, res);
  } catch (err) {
    console.error("===== ADD CART ERROR =====");
    console.error(err);
    console.error("MESSAGE:", err.message);
    console.error("META:", err.meta || null);

    res.status(500).json({
      message: "Failed to add item",
      dbError: err.message,
      meta: err.meta || null,
    });
  }
};

/* ================================
   UPDATE ITEM QTY
================================ */
const updateQty = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: "Invalid update data" });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return buildCartResponse(userId, res);

    await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: { quantity },
    });

    return await buildCartResponse(userId, res);
  } catch (err) {
    console.error("===== UPDATE QTY ERROR =====");
    console.error(err);
    console.error("MESSAGE:", err.message);
    console.error("META:", err.meta || null);

    res.status(500).json({
      message: "Failed to update quantity",
      dbError: err.message,
      meta: err.meta || null,
    });
  }
};

/* ================================
   REMOVE ITEM
================================ */
const removeItem = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const productId = Number(req.params.productId);

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return buildCartResponse(userId, res);

    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    return await buildCartResponse(userId, res);
  } catch (err) {
    console.error("===== REMOVE ITEM ERROR =====");
    console.error(err);
    console.error("MESSAGE:", err.message);
    console.error("META:", err.meta || null);

    res.status(500).json({
      message: "Failed to remove item",
      dbError: err.message,
      meta: err.meta || null,
    });
  }
};

/* ================================
   CLEAR CART
================================ */
const clearCart = async (req, res) => {
  try {
    const userId = Number(req.user.id);

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return buildCartResponse(userId, res);

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return buildCartResponse(userId, res);
  } catch (err) {
    console.error("===== CLEAR CART ERROR =====");
    console.error(err);
    console.error("MESSAGE:", err.message);
    console.error("META:", err.meta || null);

    res.status(500).json({
      message: "Failed to clear cart",
      dbError: err.message,
      meta: err.meta || null,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart,
};
