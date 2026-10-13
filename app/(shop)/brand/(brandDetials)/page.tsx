"use client";

import Link from "next/link";
import { Image, Spin, message } from "antd";
import { Heart, ShoppingCartPlus, Star } from "lucide-react";
import { useState } from "react";

import { useAddToCart } from "@/hook/AddCart";
import { useProducts } from "../../products/hook/Products";
import { useWishlist } from "../../wishlist/hook/useWishlist";
import useWishlistAdd from "../../wishlist/hook/useWishlistAdd";
import { useRemoveWishlist } from "../../wishlist/hook/useRemoveWishlist";

interface Props {
  brandId: string;
}

const API_URL = "https://oline-shop-backend.onrender.com";

export default function BrandDetials({ brandId }: Props) {
  const { data, isLoading, isError } = useProducts();
  const [likedOverrides, setLikedOverrides] = useState<Record<string, boolean>>(
    {},
  );
  const { mutate: addToCart } = useAddToCart();
  const { data: wishlistData } = useWishlist();
  const { mutate: addWishlist } = useWishlistAdd();
  const { mutate: removeWishlist } = useRemoveWishlist();

  const [processingId, setProcessingId] = useState<string | null>(null);

  const products = (data?.data ?? []) as any[];
  const wishlistItems = (wishlistData?.data?.items ?? []) as any[];

  // Faqat tanlangan brandga tegishli mahsulotlar
  const filteredProducts = products.filter(
    (product) => String(product.brandId ?? product.brand?.id ?? "") === brandId,
  );

  // Wishlist holatini tekshirish
  const isLiked = (productId: string) =>
    wishlistItems.some(
      (item) =>
        item.productId === productId ||
        item.product?.id === productId ||
        item.id === productId,
    );

  // Wishlistga qo'shish yoki olib tashlash
  const handleWishlist = (productId: string) => {
    if (processingId) return;

    const liked = likedOverrides[productId] ?? isLiked(productId);

    // Like rangini darhol o'zgartirish
    setLikedOverrides((prev) => ({
      ...prev,
      [productId]: !liked,
    }));

    setProcessingId(productId);

    const options = {
      onError: () => {
        // Xatolik bo'lsa, avvalgi rangga qaytarish
        setLikedOverrides((prev) => ({
          ...prev,
          [productId]: liked,
        }));

        message.error("Amalni bajarishda xatolik yuz berdi");
      },
      onSettled: () => {
        setProcessingId(null);
      },
    };

    if (liked) {
      removeWishlist(productId, options);
    } else {
      addWishlist({ id: productId }, options);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        Mahsulotlarni yuklashda xatolik yuz berdi.
      </div>
    );
  }

  return (
    <section className="w-full px-[44px] py-8">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#023337]">
          Brend mahsulotlari
        </h1>

        <p className="mt-2 text-[14px] text-[#64748B]">
          {filteredProducts.length} ta mahsulot topildi
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          Bu brendga tegishli mahsulotlar topilmadi.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const liked = likedOverrides[product.id] ?? isLiked(product.id);

            const mainImage =
              product.images?.[0]?.url ||
              product.images?.[0]?.imageUrl ||
              product.image ||
              "";

            const imageUrl = mainImage
              ? mainImage.startsWith("http")
                ? mainImage
                : `${API_URL}${mainImage.startsWith("/") ? "" : "/"}${mainImage}`
              : "";

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="relative flex h-full flex-col rounded-[12px] bg-white p-3 shadow-[0px_1px_3px_0px_#00000033] transition-all duration-300 hover:scale-105"
              >
                {/* IMAGE */}
                <div className="relative flex h-[180px] w-full justify-center">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.images?.[0]?.alt || product.name}
                      preview={false}
                      className="!h-[180px] !w-full !bg-white !object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      Rasm mavjud emas
                    </div>
                  )}

                  {/* LIKE */}
                  <button
                    type="button"
                    aria-label={
                      liked
                        ? "Wishlistdan olib tashlash"
                        : "Wishlistga qo'shish"
                    }
                    disabled={processingId !== null}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleWishlist(product.id);
                    }}
                    className={`absolute cursor-pointer right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 active:scale-90 ${
                      liked ? "bg-pink-100" : "bg-white hover:bg-pink-50"
                    }`}
                  >
                    <Heart
                      size={19}
                      color={liked ? "#ef4444" : "#374151"}
                      fill={liked ? "#ef4444" : "transparent"}
                    />
                  </button>
                </div>

                {/* INFO */}
                <div className="mt-3">
                  <p className="line-clamp-1 text-[22px] font-bold">
                    {product.name}
                  </p>

                  <p className="line-clamp-2 text-[16px] font-normal text-[#00000099]">
                    {product.shortDescription || product.description}
                  </p>

                  {/* RATING */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={
                            star <= Math.round(product.averageRating ?? 0)
                              ? "yellow"
                              : "transparent"
                          }
                          color="yellow"
                        />
                      ))}
                    </div>

                    <p className="text-[14px] font-bold text-[#6B7280]">
                      ({product.reviewsCount ?? 0} reviews)
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="mt-2 flex flex-col gap-2">
                    {product.oldPrice > product.price && (
                      <p className="text-[16px] text-[#00000099] line-through">
                        {product.oldPrice.toLocaleString("uz-UZ")} UZS
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[22px] font-bold text-[#0c4bfa]">
                        {product.price.toLocaleString("uz-UZ")} UZS
                      </p>

                      {product.oldPrice > product.price && (
                        <p className="font-bold text-[#fd0404]">
                          -{product.discountPercent}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-[16px] font-medium text-white transition-all duration-200 hover:-translate-y-[2px] hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] active:scale-95"
                  >
                    Hozir xarid qilish
                  </button>

                  <button
                    type="button"
                    aria-label="Savatga qo'shish"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      addToCart({
                        productId: product.id,
                        variantId: product.variants?.[0]?.id,
                        quantity: 1,
                      });
                    }}
                    className="cursor-pointer rounded-lg bg-[#18a8ad] px-5 py-2 text-white transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(2,51,55,0.25)] active:scale-95"
                  >
                    <ShoppingCartPlus />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
