"use client";

import React from "react";
import ProductForm from "../../../components/Admin/ProductForm";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewProductPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Add New Product
        </h1>
        <ProductForm />
      </div>
    </div>
  );
}
