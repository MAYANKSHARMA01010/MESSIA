/* prisma/seed.js */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const now = new Date();

// ---------- CATEGORIES ----------
const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Home & Kitchen" },
  { name: "Beauty" },
  { name: "Sports & Outdoors" },
  { name: "Books" },
  { name: "Toys & Games" },
  { name: "Garden & Outdoor" },
  { name: "Accessories" },
  { name: "Health & Personal Care" },
];

// ---------- IMAGE HELPER ----------
const images = (id) => [
  `https://picsum.photos/seed/product-${id}-1/1200/800`,
  `https://picsum.photos/seed/product-${id}-2/800/600`,
  `https://picsum.photos/seed/product-${id}-3/600/600`,
];

// ---------- PRODUCTS ----------
const products = [
  { name: "Wireless Noise-Cancelling Headphones", description: "Over-ear ANC headphones with deep bass.", price: 199.99, stock: 50, categoryId: 1 },
  { name: "Smart Fitness Watch", description: "Heart-rate, GPS, and sleep tracking smartwatch.", price: 129.99, stock: 70, categoryId: 1 },
  { name: "4K Smart TV 55\"", description: "Ultra HD smart television with HDR.", price: 599.99, stock: 12, categoryId: 1 },
  { name: "Portable Bluetooth Speaker", description: "12-hour battery compact speaker.", price: 49.99, stock: 110, categoryId: 1 },
  { name: "Mechanical Gaming Keyboard", description: "RGB keyboard with tactile blue switches.", price: 79.99, stock: 90, categoryId: 1 },

  { name: "Men's Denim Jacket", description: "Classic blue slim-fit jacket.", price: 59.99, stock: 60, categoryId: 2 },
  { name: "Women's Summer Dress", description: "Floral lightweight midi dress.", price: 44.99, stock: 85, categoryId: 2 },
  { name: "Cotton T-Shirt (3 Pack)", description: "Unisex soft cotton tees.", price: 24.99, stock: 200, categoryId: 2 },

  { name: "Ceramic Cookware Set (7pc)", description: "Premium non-stick cookware.", price: 149.99, stock: 25, categoryId: 3 },
  { name: "Air Fryer 5L", description: "Oil-free air fryer with presets.", price: 109.99, stock: 36, categoryId: 3 },
  { name: "Memory Foam Pillow", description: "Orthopedic sleep support pillow.", price: 29.99, stock: 78, categoryId: 3 },
  { name: "Electric Kettle", description: "1.7L quick boil kettle.", price: 34.99, stock: 62, categoryId: 3 },
  { name: "Stand Mixer 5L", description: "Multi-speed baking mixer.", price: 249.99, stock: 20, categoryId: 3 },
  { name: "Premium Bedsheet (Queen)", description: "300TC cotton bed sheets.", price: 39.99, stock: 65, categoryId: 3 },

  { name: "Vitamin C Serum", description: "Brightening facial serum.", price: 29.99, stock: 130, categoryId: 4 },
  { name: "Matte Lipstick Set", description: "Long-lasting 6 shade set.", price: 19.99, stock: 160, categoryId: 4 },
  { name: "Herbal Shampoo", description: "Sulfate-free botanical shampoo.", price: 14.99, stock: 140, categoryId: 4 },
  { name: "Organic Matcha Powder", description: "Ceremonial-grade matcha.", price: 18.99, stock: 65, categoryId: 4 },

  { name: "Yoga Mat 6mm", description: "Anti-slip workout mat.", price: 34.99, stock: 92, categoryId: 5 },
  { name: "Adjustable Dumbbells", description: "Space-saving weight set.", price: 159.99, stock: 18, categoryId: 5 },
  { name: "Trail Running Shoes", description: "Breathable outdoor shoes.", price: 89.99, stock: 75, categoryId: 5 },
  { name: "Camping Hammock", description: "Two-person travel hammock.", price: 29.99, stock: 100, categoryId: 5 },

  { name: "The Silent River", description: "Top-selling fiction novel.", price: 12.99, stock: 150, categoryId: 6 },
  { name: "Baby Swaddle Blanket", description: "2-pack breathable cotton blankets.", price: 21.99, stock: 90, categoryId: 6 },

  { name: "500pc Puzzle", description: "Educational kids puzzle.", price: 9.99, stock: 145, categoryId: 7 },
  { name: "STEM Building Blocks", description: "Creative learning toy kit.", price: 32.99, stock: 85, categoryId: 7 },
  { name: "Ride-on Car", description: "Kids battery-powered car.", price: 199.99, stock: 10, categoryId: 7 },

  { name: "Solar String Lights", description: "Outdoor lighting set.", price: 18.99, stock: 60, categoryId: 8 },
  { name: "Garden Tool Kit", description: "Steel gardening tools.", price: 34.99, stock: 45, categoryId: 8 },
  { name: "Pet Grooming Kit", description: "Dog/cat grooming tools.", price: 29.99, stock: 55, categoryId: 8 },

  { name: "RFID Leather Wallet", description: "Slim genuine leather wallet.", price: 19.99, stock: 100, categoryId: 9 },
  { name: "Polarized Sunglasses", description: "UV400 eyewear.", price: 17.99, stock: 90, categoryId: 9 },
  { name: "Bluetooth Selfie Remote", description: "Wireless camera clicker.", price: 7.99, stock: 120, categoryId: 9 },
  { name: "Travel Mug", description: "500ml insulated mug.", price: 14.99, stock: 80, categoryId: 9 },

  { name: "Electric Toothbrush", description: "Rechargeable sonic brush.", price: 29.99, stock: 100, categoryId: 10 },
  { name: "Vitamin D3 + K2", description: "Bone support capsules.", price: 14.99, stock: 140, categoryId: 10 },
  { name: "White Noise Machine", description: "Sleep relaxation device.", price: 34.99, stock: 45, categoryId: 10 },
];

// attach images & timestamps
products.forEach((p, i) => {
  p.images = images(i + 1);
  p.isVisible = true;
  p.createdAt = now;
  p.updatedAt = now;
});

async function main() {
  console.log("Clearing old data...");
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Seeding categories...");
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log("Seeding products...");
  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
