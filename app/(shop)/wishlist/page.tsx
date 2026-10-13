"use client";

import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  ShoppingCartPlus,
  ArrowRight,
  Trash2,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Spin } from "antd";
import { useWishlist } from "./hook/useWishlist";
import { useRemoveWishlist } from "./hook/useRemoveWishlist";
import { useAddToCart } from "../../../hook/AddCart";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
interface WishlistProduct {
  id: string;
  name: string;
  image?: string;
  images?: {
    url: string;
    alt?: string;
    isMain?: boolean;
  }[];
  price: number;
  oldPrice?: number;
  brand?: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  averageRating?: number;
  reviewsCount?: number;
  discountPercent?: number;
  variants?: {
    id: string;
  }[];
}

interface WishlistItem {
  id: string;
  productId?: string;
  product: WishlistProduct;
}

export default function Wishlist() {
  const queryClient = useQueryClient();
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const { data, isLoading, isError } = useWishlist();
  const { mutate: removeWishlist, isPending: isRemoving } = useRemoveWishlist();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const wishlist = data?.data;
  const items: WishlistItem[] = wishlist?.items ?? [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("uz-UZ").format(price);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spin size="large" />
          <p className="text-sm text-gray-500">Loading wishlist...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <Heart size={48} className="mx-auto text-gray-300" />
          <h2 className="mt-4 text-xl font-semibold text-[#023337]">
            Wishlist yuklanmadi
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Ma’lumotlarni yuklashda xatolik yuz berdi.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-[#023337] px-6 py-3 text-sm font-semibold text-white hover:bg-[#03484d]"
          >
            Qayta urinish
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8faf9]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#4EA674]">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-[#023337]">Wishlist</span>
        </div>

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5ec]">
                <Heart size={25} className="fill-[#4EA674] text-[#4EA674]" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#023337] sm:text-4xl">
                My Wishlist
              </h1>
            </div>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Sevimli mahsulotlaringiz bir joyda.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5">
            <Heart size={16} className="text-[#4EA674]" />
            <span className="text-sm font-semibold text-[#023337]">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="rounded-[24px] border border-gray-100 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#f0f8f2]">
              <Heart size={44} className="text-[#4EA674]" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#023337]">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Mahsulotlarni ko‘rib chiqing va yoqtirganlaringizni wishlist’ga
              qo‘shing.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#023337] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#03484d]"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          /* Product cards */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => {
              const product = item.product;

              const mainImage =
                product.images?.find((image) => image.isMain)?.url ||
                product.images?.[0]?.url ||
                product.image;

              const hasDiscount =
                product.oldPrice !== undefined &&
                product.oldPrice > product.price;

              return (
                <article
                  key={item.id}
                  className="relative flex h-full min-w-0 flex-col rounded-[12px] bg-white p-3 shadow-[0px_1px_3px_0px_#00000033] transition-shadow duration-300 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative flex h-[180px] w-full items-center justify-center">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="h-[180px] w-full rounded-lg bg-white object-contain"
                      />
                    ) : (
                      <ShoppingBag size={45} className="text-gray-300" />
                    )}

                    {hasDiscount && (
                      <span className="absolute left-1 top-1 rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                        Sale
                      </span>
                    )}

                    <button
                      type="button"
                      aria-label="Remove from wishlist"
                      title="Remove from wishlist"
                      disabled={removingIds.includes(product.id)}
                      onClick={() => {
                        setRemovingIds((prev) => [...prev, product.id]);

                        removeWishlist(product.id, {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: ["wishlist"],
                            });
                          },
                          onError: () => {
                            setRemovingIds((prev) =>
                              prev.filter((id) => id !== product.id),
                            );
                          },
                          onSettled: () => {
                            setRemovingIds((prev) =>
                              prev.filter((id) => id !== product.id),
                            );
                          },
                        });
                      }}
                      className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 active:scale-90 disabled:opacity-50"
                    >
                      <Heart
                        size={18}
                        fill={
                          removingIds.includes(product.id)
                            ? "transparent"
                            : "#ef4444"
                        }
                        color="#ef4444"
                        className="transition-all duration-150"
                      />
                    </button>
                  </div>

                  {/* Product info */}
                  <div className="mt-3 flex flex-1 flex-col">
                    {product.brand && (
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                        {product.brand}
                      </p>
                    )}

                    <div className="flex flex-col gap-2">
                      <h2 className="line-clamp-1 text-[20px] font-bold text-[#023337]">
                        {product.name}
                      </h2>

                      <p className="mt-1 line-clamp-2 min-h-[40px] text-sm text-[#00000099]">
                        {product.shortDescription || product.description || ""}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            fill={
                              star <= Math.round(product.averageRating ?? 0)
                                ? "#eab308"
                                : "transparent"
                            }
                            color="#eab308"
                          />
                        ))}
                      </div>

                      <span className="text-xs font-bold text-[#6B7280]">
                        ({product.reviewsCount ?? 0} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex flex-col gap-1">
                      {hasDiscount && (
                        <p className="text-sm text-[#00000099] line-through">
                          {formatPrice(product.oldPrice!)} UZS
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-bold text-[#0c4bfa]">
                          {formatPrice(product.price)} UZS
                        </p>

                        {hasDiscount && (
                          <span className="text-sm font-bold text-red-500">
                            -
                            {product.discountPercent ??
                              Math.round(
                                ((product.oldPrice! - product.price) /
                                  product.oldPrice!) *
                                  100,
                              )}
                            %
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 rounded-lg bg-blue-600 px-2 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                      >
                        Hozir xarid qilish
                      </Link>

                      <button
                        type="button"
                        disabled={isAddingToCart}
                        aria-label="Add to cart"
                        onClick={() =>
                          addToCart({
                            productId: product.id,
                            variantId: product.variants?.[0]?.id,
                            quantity: 1,
                          })
                        }
                        className="flex h-10 w-11 shrink-0 items-center justify-center rounded-lg bg-[#18a8ad] text-white transition hover:bg-[#12969b] active:scale-95 disabled:opacity-50"
                      >
                        <ShoppingCartPlus size={20} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom navigation */}
        {items.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#023337] transition hover:border-[#4EA674] hover:text-[#4EA674]"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
