const { prisma } = require("../config/database");

async function createProduct(req, res) {
  try {
    const { name, description, price, stock, categoryId, images, isVisible } =
      req.body;

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ ERROR: "Category not found" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock: stock || 0,
        categoryId,
        images: images || [],
        isVisible: isVisible !== undefined ? isVisible : true,
      },
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("CreateProduct error:", err);
    return res
      .status(500)
      .json({ ERROR: "Internal Server Error while creating product" });
  }
}

async function getAllProducts(req, res) {
  try {
    const { page = 1, limit = 10, categoryId, showHidden } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    // By default, only show visible products.
    // Admin can pass showHidden=true to see everything (logic for admin check can be added here or in middleware)
    // For now, let's assume public API only shows visible, unless a specific flag is passed (which we might restrict later)
    if (showHidden !== "true") {
      where.isVisible = true;
    }

    // Run queries in parallel for optimization
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: { category: true },
        orderBy: { createdAt: "desc" }, // Good practice to have default sort
      }),
      prisma.product.count({ where }),
    ]);

    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GetAllProducts error:", err);
    return res
      .status(500)
      .json({ ERROR: "Internal Server Error while fetching products" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });

    if (!product) {
      return res.status(404).json({ ERROR: "Product not found" });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    console.error("GetProductById error:", err);
    return res
      .status(500)
      .json({ ERROR: "Internal Server Error while fetching product" });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, images, isVisible } =
      req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ ERROR: "Product not found" });
    }

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(404).json({ ERROR: "Category not found" });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name: name || undefined,
        description: description || undefined,
        price: price || undefined,
        stock: stock !== undefined ? stock : undefined,
        categoryId: categoryId || undefined,
        images: images || undefined,
        isVisible: isVisible !== undefined ? isVisible : undefined,
      },
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("UpdateProduct error:", err);
    return res
      .status(500)
      .json({ ERROR: "Internal Server Error while updating product" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ ERROR: "Product not found" });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DeleteProduct error:", err);
    return res
      .status(500)
      .json({ ERROR: "Internal Server Error while deleting product" });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
