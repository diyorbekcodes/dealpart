"use client";

import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Spin } from "antd";
import { useWishlist } from "./hook/useWishlist";
import { useHasSession } from "@/hook/useHasSession";
import CardProduct from "@/components/ui/CardProduct";
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
  const { ready, hasSession } = useHasSession();
  const { data, isLoading, isError } = useWishlist();

  const wishlist = data?.data;
  const items: WishlistItem[] = wishlist?.items ?? [];

  if (!ready || (hasSession && isLoading)) {
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => {
              const product = item.product;
              const mainImage =
                product.images?.find((image) => image.isMain)?.url ||
                product.images?.[0]?.url ||
                product.image;

              return (
                <CardProduct
                  key={item.id}
                  product={product}
                  mainImage={mainImage}
                />
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
