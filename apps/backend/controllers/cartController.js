const prisma = require("../config/database");

/* ================================
   HELPER
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
    image: i.product?.images?.[0],
    quantity: i.quantity,
  }));

  return calculateAndSend(res, items);
};

/* ================================
   GET CART
================================ */
const getCart = async (req, res) => {
  try {
    return await buildCartResponse(req.user.id, res);
  } catch (err) {
    console.error("GET CART:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

/* ================================
   ADD TO CART
================================ */
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    // Ensure cart exists
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
    console.error("ADD CART:", err);
    res.status(500).json({ message: "Failed to add item" });
  }
};

/* ================================
   UPDATE ITEM QTY (SAFE)
================================ */
const updateQty = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: "Invalid update data" });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

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
    console.error("UPDATE QTY:", err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
};

/* ================================
   REMOVE ITEM
================================ */
const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
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
    console.error("REMOVE CART ITEM:", err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};

/* ================================
   CLEAR CART
================================ */
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return buildCartResponse(userId, res);

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return buildCartResponse(userId, res);
  } catch (err) {
    console.error("CLEAR CART:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

/* ================================
   EXPORTS
================================ */
module.exports = {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart,
};
