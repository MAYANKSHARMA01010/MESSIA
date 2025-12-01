"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Loader2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { API_BASE_URL } from "../../utils/api";

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const BASE_URL = API_BASE_URL;

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${params.id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
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

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Product not found
        </h2>
        <Link
          href="/products"
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[selectedImage]
                    : "https://placehold.co/600x400?text=No+Image"
                }
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-h-1 aspect-w-1 overflow-hidden rounded-lg border-2 ${
                      selectedImage === index
                        ? "border-indigo-500"
                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="button"
                disabled={product.stock === 0}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900"
                onClick={() => alert("Add to cart functionality coming soon!")}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
