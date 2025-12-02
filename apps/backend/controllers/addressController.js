const { prisma } = require("../config/database.js");

/* ========================== GET ALL ========================== */
const getAddresses = async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: { isDefault: "desc" },
    });

    res.status(200).json(addresses);
  } catch (error) {
    console.error("GET ADDRESS ERROR:", error);
    res.status(500).json({ message: "Failed to get addresses" });
  }
};

/* ========================= CREATE ============================ */
const createAddress = async (req, res) => {
  try {
    const data = req.body;

    /* Remove old default if new default is requested */
    if (data.isDefault === true) {
      await prisma.address.updateMany({
        where: { userId: req.user.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        ...data,
        isDefault: !!data.isDefault,
        userId: req.user.id,
      },
    });

    res.status(201).json(address);
  } catch (error) {
    console.error("CREATE ADDRESS ERROR:", error);
    res.status(500).json({ message: "Failed to create address" });
  }
};

/* =========================== UPDATE =========================== */
const updateAddress = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    /* Ensure address belongs to user */
    const existing = await prisma.address.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (req.body.isDefault === true) {
      await prisma.address.updateMany({
        where: {
          userId: req.user.id,
          NOT: { id },
        },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id },
      data: {
        ...req.body,
        isDefault:
          typeof req.body.isDefault === "boolean"
            ? req.body.isDefault
            : undefined,
      },
    });

    res.status(200).json(address);
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

/* =========================== DELETE ============================ */
const deleteAddress = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    /* Ensure address belongs to user */
    const existing = await prisma.address.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Address not found" });
    }

    await prisma.address.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);
    res.status(500).json({ message: "Failed to delete address" });
  }
};

/* ======================= SET DEFAULT ========================== */
const setDefaultAddress = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    /* Ensure address belongs to user */
    const existing = await prisma.address.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Address not found" });
    }

    /* Clear old defaults */
    await prisma.address.updateMany({
      where: { userId: req.user.id },
      data: { isDefault: false },
    });

    /* Set new default */
    const address = await prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });

    res.status(200).json(address);
  } catch (error) {
    console.error("SET DEFAULT ERROR:", error);
    res.status(500).json({ message: "Failed to set default address" });
  }
};

/* ========================== EXPORT =========================== */
module.exports = {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
