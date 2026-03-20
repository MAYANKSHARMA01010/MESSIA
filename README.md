# MESSIA - Premium E-Commerce Application

MESSIA is a full-stack e-commerce platform designed for gifting premium products. It features a modern, responsive frontend built with Next.js and a robust backend powered by Node.js, Express, and PostgreSQL.

## 🚀 Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Context API (Auth, Cart)
- **Notifications**: React Hot Toast

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt

## 📂 Project Structure

```
.
├── README.md
├── apps
│   ├── backend                 # Express.js Backend
│   │   ├── config              # Database & CORS config
│   │   ├── controllers         # Route controllers (Auth, Product, Cart, etc.)
│   │   ├── middlewares         # Auth & Admin middlewares
│   │   ├── models              # Prisma models
│   │   ├── prisma              # Prisma schema & migrations
│   │   ├── routes              # API routes
│   │   └── utils               # Helper functions
│   └── frontend                # Next.js Frontend
│       ├── app                 # App Router
│       │   ├── (pages)         # Application pages
│       │   ├── components      # Reusable UI components
│       │   ├── context         # React Context (Auth, Cart)
│       │   ├── globals.css     # Global styles & Tailwind
│       │   └── layout.js       # Root layout
│       └── public              # Static assets
└── package.json
```

## 🛠️ Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/MAYANKSHARMA01010/MESSIA.git](https://github.com/KraftlyWebStudio/MESSIA)
cd messia
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd apps/backend
npm install
```

Create a `.env` file in `apps/backend` with the following variables:

```env
PORT=5001
DATABASE_URL="postgresql://user:password@localhost:5432/messia_db?schema=public"
JWT_SECRET="your_super_secret_key"
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5001`.

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ..apps/frontend
npm install
```

Create a `.env` file in `apps/frontend` (optional, if needed for API URL):

```env
NEXT_PUBLIC_API_URL="http://localhost:5001/api"
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`.

## 🌟 Features

- **User Authentication**: Sign up, Login, and Profile management.
- **Product Management**: Admin dashboard to add, edit, and delete products.
- **Shopping Cart**: Add items, adjust quantities, and view cart summary.
- **Address Book**: Manage shipping addresses with a premium UI.
- **Responsive Design**: Fully optimized for mobile and desktop devices.
- **Dark Mode**: Built-in dark mode support.

## 📝 API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Address

- `GET /api/address` - List addresses
- `POST /api/address` - Add new address
- `PUT /api/address/:id` - Update address
- `DELETE /api/address/:id` - Delete address
