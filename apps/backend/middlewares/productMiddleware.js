function validateProduct(req, res, next) {
  let { name, description, price, stock, categoryId, images, isVisible } =
    req.body;

  // Required checks
  if (!name || !description || price === undefined || !categoryId) {
    return res.status(400).json({
      ERROR: "Name, description, price, and categoryId are required",
    });
  }

  // Price validation (no falsy bug)
  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({
      ERROR: "Price must be a non-negative number",
    });
  }

  // Stock validation (0 allowed)
  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return res.status(400).json({
      ERROR: "Stock must be a non-negative number",
    });
  }

  // Images validation
  if (images && !Array.isArray(images)) {
    return res
      .status(400)
      .json({ ERROR: "Images must be an array of URL strings" });
  }

  // isVisible validation
  if (isVisible !== undefined && typeof isVisible !== "boolean") {
    return res
      .status(400)
      .json({ ERROR: "isVisible must be a boolean" });
  }

  // Cleanup
  req.body.name = name.trim();
  req.body.description = description.trim();
  req.body.categoryId = parseInt(categoryId);

  next();
}

module.exports = { validateProduct };
