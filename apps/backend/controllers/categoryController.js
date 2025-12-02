const { prisma } = require("../config/database");

/* ================= READ ALL ================= */
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                children: true, // Fetch subcategories
            },
            orderBy: { name: "asc" },
        });

        res.status(200).json({ categories });
    } catch (error) {
        console.error("GET CATEGORIES ERROR:", error);
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};

/* ================= CREATE ================= */
const createCategory = async (req, res) => {
    try {
        const { name, description, image, parentId } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const category = await prisma.category.create({
            data: {
                name,
                description,
                image,
                parentId: parentId ? parseInt(parentId) : null,
            },
        });

        res.status(201).json({ message: "Category created", category });
    } catch (error) {
        console.error("CREATE CATEGORY ERROR:", error);
        if (error.code === "P2002") {
            return res.status(400).json({ message: "Category already exists" });
        }
        res.status(500).json({ message: "Failed to create category" });
    }
};

/* ================= UPDATE ================= */
const updateCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description, image, parentId } = req.body;

        const category = await prisma.category.update({
            where: { id },
            data: {
                name: name || undefined,
                description: description || undefined,
                image: image || undefined,
                parentId: parentId ? parseInt(parentId) : undefined,
            },
        });

        res.status(200).json({ message: "Category updated", category });
    } catch (error) {
        console.error("UPDATE CATEGORY ERROR:", error);
        res.status(500).json({ message: "Failed to update category" });
    }
};

/* ================= DELETE ================= */
const deleteCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.category.delete({
            where: { id },
        });

        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        console.error("DELETE CATEGORY ERROR:", error);
        res.status(500).json({ message: "Failed to delete category" });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
