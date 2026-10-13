"use client";

import { Select, Spin, message } from "antd";
import { useProducts } from "./hook/Products";
import { useState } from "react";

import { useWishlist } from "../wishlist/hook/useWishlist";
import CardProduct from "@/components/ui/CardProduct";
interface Props {
  categoryId: string;
}
export default function Products({ categoryId }: Props) {
  const { data, isLoading, isError } = useProducts();
  const [sortBy, setSortBy] = useState("all");

  const { data: wishlistData } = useWishlist();

  const [processingId, setProcessingId] = useState<string | null>(null);

  const wishlistItems = wishlistData?.data?.items ?? [];

  const isLiked = (productId: string) => {
    if (productId in optimisticLikes) {
      return optimisticLikes[productId];
    }

    return wishlistItems.some(
      (item: { productId?: string; product?: { id?: string } }) =>
        item.productId === productId || item.product?.id === productId,
    );
  };

  const filteredProducts = [...(data?.data ?? [])].filter((product) => {
    const matchesCategory =
      !categoryId ||
      categoryId === "all" ||
      product.category?.id === categoryId;

    return matchesCategory;
  });
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.averageRating - a.averageRating;
    return 0;
  });

  const [optimisticLikes, setOptimisticLikes] = useState<
    Record<string, boolean>
  >({});

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p>Products yuklashda xatolik yuz berdi</p>
      </div>
    );
  }

  return (
    <section className="px-[20px] py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold">
            {data?.data?.find((product) => product.category?.id === categoryId)
              ?.category?.name || "All products"}
          </h1>
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

      <div className="mt-7 grid grid-cols-5 gap-5">
        {sortedProducts.map((product) => {
          const mainImage =
            product.images?.find((image) => image.isMain)?.url ||
            product.images?.[0]?.url;

          const liked = isLiked(product.id);
          const isProcessing = processingId === product.id;

          return (
            <CardProduct key={product.id}
              product={product}
              mainImage={mainImage}
              liked={liked}
              isProcessing={isProcessing}
              isLiked={isLiked}
              processingId={processingId}
              setProcessingId={setProcessingId}
              setOptimisticLikes={setOptimisticLikes}
            />
          );
        })}
      </div>
    </section>
  );
}
