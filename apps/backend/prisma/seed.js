const { prisma } = require("../config/database");


async function main() {
  console.log("🌱 Starting seed...");

  // ===========================================
  // USERS
  // ===========================================
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      username: "admin",
      email: "admin@messia.com",
      password: "admin123",
      role: "ADMIN",
      gender: "Male",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      username: "testuser",
      email: "user@messia.com",
      password: "user123",
      gender: "Female",
    },
  });

  console.log("✅ Users created");

  // ===========================================
  // CATEGORIES
  // ===========================================
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      description: "Smart devices and electronic gadgets",
      image: "https://picsum.photos/400?electronics",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      description: "Men & women fashion",
      image: "https://picsum.photos/400?clothes",
    },
  });

  const home = await prisma.category.create({
    data: {
      name: "Home & Kitchen",
      description: "Essentials for daily living",
      image: "https://picsum.photos/400?home",
    },
  });

  const books = await prisma.category.create({
    data: {
      name: "Books",
      description: "Knowledge & entertainment",
      image: "https://picsum.photos/400?books",
    },
  });

  const sports = await prisma.category.create({
    data: {
      name: "Sports",
      description: "Fitness & outdoor gear",
      image: "https://picsum.photos/400?sports",
    },
  });

  // ===========================================
  // SUBCATEGORIES
  // ===========================================
  const mobiles = await prisma.category.create({
    data: { name: "Mobiles", parentId: electronics.id },
  });

  const laptops = await prisma.category.create({
    data: { name: "Laptops", parentId: electronics.id },
  });

  const mens = await prisma.category.create({
    data: { name: "Men Clothing", parentId: clothing.id },
  });

  const womens = await prisma.category.create({
    data: { name: "Women Clothing", parentId: clothing.id },
  });

  const cookware = await prisma.category.create({
    data: { name: "Cookware", parentId: home.id },
  });

  const study = await prisma.category.create({
    data: { name: "Study Books", parentId: books.id },
  });

  const fitness = await prisma.category.create({
    data: { name: "Fitness Gear", parentId: sports.id },
  });

  console.log("✅ Categories created");

  // ===========================================
  // PRODUCTS DATA (60+)
  // ===========================================
  const productData = [
    // ================= MOBILES =================
    ...Array.from({ length: 15 }, (_, i) => ({
      name: `Galaxy Phone ${i + 1}`,
      description: `Android smartphone with AMOLED display, long battery life and smooth performance.`,
      price: 12999 + i * 800,
      stock: 50 - i,
      images: [
        "https://picsum.photos/seed/mobile1/600",
        "https://picsum.photos/seed/mobile2/600",
      ],
      isVisible: true,
      categoryId: mobiles.id,
    })),

    // ================= LAPTOPS =================
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `UltraBook Pro ${i + 1}`,
      description: `Slim laptop powered with Intel processor, SSD storage and full HD display.`,
      price: 39999 + i * 2500,
      stock: 20 + i,
      images: [
        "https://picsum.photos/seed/laptop1/600",
        "https://picsum.photos/seed/laptop2/600",
      ],
      isVisible: true,
      categoryId: laptops.id,
    })),

    // ================= MEN CLOTHING =================
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `Men Casual Shirt ${i + 1}`,
      description: `100% cotton breathable shirt for daily wear.`,
      price: 599 + i * 80,
      stock: 70,
      images: [
        "https://picsum.photos/seed/shirt1/600",
        "https://picsum.photos/seed/shirt2/600",
      ],
      isVisible: true,
      categoryId: mens.id,
    })),

    // ================= WOMEN CLOTHING =================
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `Women Kurti ${i + 1}`,
      description: `Stylish ethnic kurti perfect for office and casual outings.`,
      price: 799 + i * 90,
      stock: 50,
      images: [
        "https://picsum.photos/seed/kurti1/600",
        "https://picsum.photos/seed/kurti2/600",
      ],
      isVisible: true,
      categoryId: womens.id,
    })),

    // ================= COOKWARE =================
    ...Array.from({ length: 8 }, (_, i) => ({
      name: `Nonstick Pan ${i + 1}`,
      description: `High-quality nonstick cookware for oil-free cooking.`,
      price: 499 + i * 60,
      stock: 30,
      images: [
        "https://picsum.photos/seed/pan1/600",
        "https://picsum.photos/seed/pan2/600",
      ],
      isVisible: true,
      categoryId: cookware.id,
    })),

    // ================= BOOKS =================
    ...Array.from({ length: 7 }, (_, i) => ({
      name: `Programming Book Vol ${i + 1}`,
      description: `Complete guide to programming fundamentals with practical examples.`,
      price: 399 + i * 100,
      stock: 100,
      images: [
        "https://picsum.photos/seed/book1/600",
      ],
      isVisible: true,
      categoryId: study.id,
    })),

    // ================= FITNESS GEAR =================
    ...Array.from({ length: 5 }, (_, i) => ({
      name: `Dumbbell Set ${i + 1}`,
      description: `Gym-grade dumbbell set for strength training.`,
      price: 999 + i * 200,
      stock: 40,
      images: [
        "https://picsum.photos/seed/dumbbell1/600",
      ],
      isVisible: true,
      categoryId: fitness.id,
    })),
  ];

  // ===========================================
  // INSERT PRODUCTS
  // ===========================================
  for (const product of productData) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ ${productData.length} products seeded`);

  // ===========================================
  // CART + CART ITEMS
  // ===========================================
  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  const products = await prisma.product.findMany({
    take: 5,
  });

  for (const product of products) {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity: Math.floor(Math.random() * 3) + 1,
      },
    });
  }

  console.log("✅ Demo cart populated");

  // ===========================================
  // ADDRESS
  // ===========================================
  await prisma.address.create({
    data: {
      userId: user.id,
      name: "Test User",
      email: "user@messia.com",
      phone: "9876543210",
      address1: "221B Baker Street",
      address2: "Near Central Mall",
      city: "Delhi",
      state: "Delhi",
      district: "North Delhi",
      pincode: "110033",
      isDefault: true,
    },
  });

  console.log("✅ Address created");
  console.log("🎉 SEED COMPLETED SUCCESSFULLY");
}

main()
  .catch((err) => {
    console.error("❌ SEED FAILED:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
