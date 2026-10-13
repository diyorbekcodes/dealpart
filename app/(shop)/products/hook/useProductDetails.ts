
"use client";

import { useEffect, useState } from "react";
import type { Product } from "../types/ProductsType";

type ProductDetailsResponse = {
  success: boolean;
  data: Product;
};

export function useProductDetails(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setError("Mahsulot ID si topilmadi");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function getProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!baseUrl) {
          throw new Error("API manzili sozlanmagan");
        }

        const response = await fetch(
          `${baseUrl}/products/${productId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Mahsulotni yuklab bo‘lmadi");
        }

        const result: ProductDetailsResponse =
          await response.json();

        if (!result.success || !result.data) {
          throw new Error("Mahsulot ma’lumotlari topilmadi");
        }

        setProduct(result.data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Noma’lum xatolik yuz berdi"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getProduct();

    return () => controller.abort();
  }, [productId]);

  return {
    product,
    loading,
    error,
  };
}
