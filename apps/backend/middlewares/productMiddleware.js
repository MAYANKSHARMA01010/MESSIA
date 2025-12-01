function validateProduct(req, res, next) {
  let { name, description, price, stock, categoryId, images, isVisible } =
    req.body;

  if (!name || !description || !price || !categoryId) {
    return res
      .status(400)
      .json({ ERROR: "Name, description, price, and categoryId are required" });
  }

  if (typeof price !== "number" || price < 0) {
    return res
      .status(400)
      .json({ ERROR: "Price must be a non-negative number" });
  }

  if (stock && (typeof stock !== "number" || stock < 0)) {
    return res
      .status(400)
      .json({ ERROR: "Stock must be a non-negative number" });
  }

  if (images && !Array.isArray(images)) {
    return res
      .status(400)
      .json({ ERROR: "Images must be an array of URL strings" });
  }

  if (isVisible !== undefined && typeof isVisible !== "boolean") {
    return res.status(400).json({ ERROR: "isVisible must be a boolean" });
  }

  req.body.name = name.trim();
  req.body.description = description.trim();

  next();
}

module.exports = { validateProduct };
