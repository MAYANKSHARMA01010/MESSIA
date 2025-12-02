const { prisma } = require("../config/database");
async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      images,
      isVisible,
    } = req.body;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });
    if (!category) {
      return res.status(404).json({ ERROR: "Category not found" });
    }
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock: stock !== undefined ? stock : 0,
        categoryId,
        images: images || [],
        isVisible: isVisible !== undefined ? isVisible : true,
      },
    });
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("CreateProduct error:", err);
    res
      .status(500)
      .json({ ERROR: "Internal Server Error while creating product" });
  }
}
async function getAllProducts(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      categoryId,
      showHidden,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {};
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }
    if (!(req.user?.role === "ADMIN" && showHidden === "true")) {
      where.isVisible = true;
    }
    const orderBy = {};
    if (sortBy) {
      orderBy[sortBy] = order === "asc" ? "asc" : "desc";
    }
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: { category: true },
        orderBy,
      }),
      prisma.product.count({ where }),
    ]);
    res.status(200).json({
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
    res
      .status(500)
      .json({ ERROR: "Internal Server Error while fetching products" });
  }
}
async function getProductById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) {
      return res.status(404).json({ ERROR: "Product not found" });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    console.error("GetProductById error:", err);
    res
      .status(500)
      .json({ ERROR: "Internal Server Error while fetching product" });
  }
}
async function updateProduct(req, res) {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      images,
      isVisible,
    } = req.body;
    const exists = await prisma.product.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({ ERROR: "Product not found" });
    }
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });
      if (!category) {
        return res.status(404).json({ ERROR: "Category not found" });
      }
    }
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        price: price !== undefined ? parseFloat(price) : undefined,
        stock: stock !== undefined ? parseInt(stock) : undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        images: images ?? undefined,
        isVisible:
          isVisible !== undefined ? String(isVisible) === "true" : undefined,
      },
    });
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("UpdateProduct error:", err);
    res
      .status(500)
      .json({ ERROR: "Internal Server Error while updating product" });
  }
}
async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id);
    const exists = await prisma.product.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({ ERROR: "Product not found" });
    }
    await prisma.product.delete({
      where: { id },
    });
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("DeleteProduct error:", err);
    res
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
