"use client";

import React, { useEffect, useState } from "react";
import ProductForm from "../../../components/Admin/ProductForm";
import { useAuth } from "../../../context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";

import { API_BASE_URL } from "../../../utils/api";

export default function EditProductPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [fetching, setFetching] = useState(true);

  const BASE_URL = API_BASE_URL;

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        router.push("/");
      } else {
        fetchProduct();
      }
    }
  }, [authLoading, isAdmin, router, params.id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${params.id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to fetch product details");
      router.push("/admin");
    } finally {
      setFetching(false);
    }
  };

  if (authLoading || fetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Edit Product
        </h1>
        {product && <ProductForm initialData={product} isEdit={true} />}
      </div>
    </div>
  );
}
