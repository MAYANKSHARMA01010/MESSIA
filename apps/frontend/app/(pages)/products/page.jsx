"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, ShoppingCart } from "lucide-react";

import { API_BASE_URL } from "../../utils/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = API_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Our Collection
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Explore our latest arrivals and timeless classics.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products available at the moment.
            </p>
          ) : (
            products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
