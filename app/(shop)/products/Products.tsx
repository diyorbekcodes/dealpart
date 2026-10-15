"use client";

import { Select } from "antd";
import { useState } from "react";
import CardProduct from "@/components/ui/CardProduct";
import { Product } from "./types/ProductsType";

interface Props {
  categoryId: string;
  products: any[];
}

export default function Products({ categoryId, products }: Props) {
  const [sortBy, setSortBy] = useState("all");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filteredProducts = [...products].filter((product) => {
    const matchesCategory =
      !categoryId ||
      categoryId === "all" ||
      product.category?.id === categoryId;

    return matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") {
      return b.averageRating - a.averageRating;
    }
    return 0;
  });

  const categoryName =
    products.find((product) => product.category?.id === categoryId)?.category
      ?.name || "All products";

  return (
    <section className="px-[20px] py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold">{categoryName}</h1>

          <p className="text-[14px] text-[#64748B]">
            {filteredProducts.length} ta mahsulot sotuvda bor
          </p>
        </div>

        <Select
          value={sortBy}
          onChange={setSortBy}
          className="w-[220px]"
          options={[
            { value: "all", label: "All products" },
            { value: "price-low", label: "Price: Low to High" },
            { value: "price-high", label: "Price: High to Low" },
            { value: "rating", label: "Rating: High to Low" },
          ]}
        />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedProducts.map((product: Product) => {
          const mainImage =
            product.images?.find((image) => image.isMain)?.url ||
            product.images?.[0]?.url;

          return (
            <CardProduct
              key={product.id}
              product={product}
              mainImage={mainImage}
              isProcessing={processingId === product.id}
              processingId={processingId}
              setProcessingId={setProcessingId}
            />
          );
        })}
      </div>
    </section>
  );
}
