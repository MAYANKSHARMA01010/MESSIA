const { prisma } = require("../config/database");
async function verifyAdmin(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user) {
      return res.status(404).json({ ERROR: "User not found" });
    }
    if (user.role !== "ADMIN") {
      return res.status(403).json({ ERROR: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    console.error("VerifyAdmin error:", err);
    return res
      .status(500)
      .json({ ERROR: "Internal Server Error during admin verification" });
  }
}
module.exports = { verifyAdmin };
