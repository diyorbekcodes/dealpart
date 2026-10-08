"use client";

import { Image, Select, Spin } from "antd";
import { useProducts } from "./hook/Products";
import { Heart, ShoppingCartPlus, Star } from "lucide-react";
import { useState } from "react";
import { useAddToCart } from "@/hook/AddCart";

export default function Products() {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const { data, isLoading, isError } = useProducts();
  const [sortBy, setSortBy] = useState("all");
  const sortedProducts = [...(data?.data || [])].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "rating") {
      return b.averageRating - a.averageRating;
    }

    return 0;
  });
  const { mutate: addToCart,isPending } = useAddToCart();
 
  
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold">All products</h1>
          <p className="text-[#64748B] text-[14px]">
            {data?.data.length} ta mahsulot sotuvda bor
          </p>
        </div>
        <div>
          <Select
            value={sortBy}
            onChange={setSortBy}
            className="w-[220px]"
            options={[
              {
                value: "all",
                label: "All products",
              },
              {
                value: "price-low",
                label: "Price: Low to High",
              },
              {
                value: "price-high",
                label: "Price: High to Low",
              },
              {
                value: "rating",
                label: "Rating: High to Low",
              },
            ]}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-7">
        {sortedProducts.map((product) => {
          const mainImage =
            product.images.find((image) => image.isMain)?.url ||
            product.images[0]?.url;

          return (
            <div
              key={product.id}
              className="bg-[#FFFFFF] transition-all duration-300 hover:scale-105 relative shadow-[0px_1px_3px_0px_#00000033] p-3 rounded-[12px] flex flex-col h-full"
            >
              {/* IMAGE */}
              <div className=" w-full flex justify-center h-[180px]">
                <Image
                  src={mainImage}
                  alt={product.images[0]?.alt || product.name}
                  preview={false}
                  className="!w-full !h-[180px] !object-contain rounded-lg !bg-white"
                />

                {/* LIKE */}
                <div
                  onClick={() =>
                    setLikes((prev) => ({
                      ...prev,
                      [product.id]: !prev[product.id],
                    }))
                  }
                  className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center bg-white rounded-full cursor-pointer shadow-sm hover:scale-110 active:scale-90 transition-transform duration-200"
                >
                  <Heart
                    size={17}
                    style={{
                      color: likes[product.id] ? "#ef4444" : "#374151",
                      fill: likes[product.id] ? "#ef4444" : "transparent",
                    }}
                    className={likes[product.id] ? "heart-animation" : ""}
                  />
                </div>
              </div>

              {/* INFO */}
              <div className="mt-3">
                <div>
                  <p className="text-[22px] font-bold line-clamp-1">
                    {product.name}
                  </p>

                  <p className="text-[16px] font-normal text-[#00000099] line-clamp-2">
                    {product.shortDescription || product.description}
                  </p>
                </div>

                {/* RATING */}
                <div className="flex gap-2 items-center justify-start mt-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill={
                          star <= Math.round(product.averageRating)
                            ? "yellow"
                            : "transparent"
                        }
                        color="yellow"
                      />
                    ))}
                  </div>

                  <div>
                    <p className="text-[14px] font-bold text-[#6B7280]">
                      ({product.reviewsCount} reviews)
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="flex flex-col gap-2 mt-2">
                  {product.oldPrice > product.price && (
                    <p className="text-[#00000099] text-[16px] line-through">
                      ${product.oldPrice.toLocaleString()}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <p className="text-[#0c4bfa] text-[22px] font-bold">
                      ${product.price.toLocaleString()}
                    </p>

                    {product.oldPrice > product.price && (
                      <p className="text-[#fd0404] font-bold">
                        -{product.discountPercent}%
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between items-center mt-auto pt-5">
                <button
                  className="
    px-3 py-2
    bg-blue-600
    hover:bg-blue-700
    hover:-translate-y-[2px]
    hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)]
    active:scale-95
    transition-all duration-200 ease-in-out
    rounded-lg
    cursor-pointer
    text-white
    text-[16px]
    font-medium
  "
                >
                  Hozir xarid qilish
                </button>
                <button
                  onClick={() =>
                    addToCart({
                      productId: product.id,
                      variantId: product.variants[0]?.id,
                      quantity: 1,
                    })
                  }
                  className="px-5 py-2 active:scale-95 hover:-translate-y-[2px]
    hover:shadow-[0_6px_20px_rgba(2,51,55,0.25)]
    transition-all duration-200 ease-in-out
    bg-[#18a8ad] rounded-lg cursor-pointer text-[#FFFFFF]"
                >
                  <ShoppingCartPlus />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
