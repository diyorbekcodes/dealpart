"use client";

import { useState } from "react";
import { Image, Spin, message } from "antd";
import { Heart, ShoppingCartPlus, Star, Tag, Clock } from "lucide-react";
import { useProducts } from "../products/hook/Products";
import { useAddToCart } from "@/hook/AddCart";
import { useRemoveWishlist } from "../wishlist/hook/useRemoveWishlist";
import { useWishlist } from "../wishlist/hook/useWishlist";
import useWishlistAdd from "../wishlist/hook/useWishlistAdd";

export default function Deals() {
  const { data, isLoading, isError } = useProducts();

  const { mutate: addToCart } = useAddToCart();
  const { data: wishlistData } = useWishlist();
  const { mutate: addWishlist } = useWishlistAdd();
  const { mutate: removeWishlist } = useRemoveWishlist();

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [optimisticLikes, setOptimisticLikes] = useState<
    Record<string, boolean>
  >({});

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

  // Faqat chegirmasi bor mahsulotlar
  const dealsProducts = [...(data?.data ?? [])]
    .filter(
      (product) =>
        Number(product.oldPrice) > Number(product.price) &&
        Number(product.price) > 0,
    )
    .sort(
      (a, b) => Number(b.discountPercent ?? 0) - Number(a.discountPercent ?? 0),
    );

  const handleWishlist = (productId: string) => {
    if (processingId !== null) return;

    const wasLiked = isLiked(productId);

    // Yurakni API javobini kutmasdan darhol yangilash
    setOptimisticLikes((prev) => ({
      ...prev,
      [productId]: !wasLiked,
    }));

    setProcessingId(productId);

    const callbacks = {
      onError: () => {
        setOptimisticLikes((prev) => ({
          ...prev,
          [productId]: wasLiked,
        }));

        message.error("Wishlistni yangilashda xatolik yuz berdi");
      },
      onSettled: () => {
        setProcessingId(null);
      },
    };

    if (wasLiked) {
      removeWishlist(productId, callbacks);
    } else {
      addWishlist({ id: productId }, callbacks);
    }
  };

  const handleAddToCart = (product: (typeof dealsProducts)[number]) => {
    addToCart(
      {
        productId: product.id,
        variantId: product.variants?.[0]?.id,
        quantity: 1,
      },
      {
        
        onError: () => {
          message.error("Savatga qo‘shishda xatolik yuz berdi");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-base text-red-500">
          Chegirmadagi mahsulotlarni yuklashda xatolik yuz berdi.
        </p>
      </div>
    );
  }

  return (
    <section className="px-5 py-10">
      {/* Deals banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#023337] via-[#07565a] to-[#18a8ad] px-6 py-9 text-white shadow-lg sm:px-10 sm:py-12">
        <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium">
              <Tag size={16} />
              Maxsus takliflar
            </div>

            <h1 className="text-3xl font-extrabold sm:text-4xl">Hot Deals</h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
              Sevimli mahsulotlaringizni ajoyib narxlarda xarid qiling.
              Chegirmalarni o‘tkazib yubormang!
            </p>
          </div>

          <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-2xl bg-white/15 sm:h-32 sm:w-32 sm:self-center">
            <Tag size={58} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#ef4444]">
            <Clock size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Chegirmalarni qo‘ldan boy bermang
            </span>
          </div>

          <h2 className="text-2xl font-bold text-[#023337] sm:text-3xl">
            Chegirmadagi mahsulotlar
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            {dealsProducts.length} ta mahsulot chegirma bilan sotuvda
          </p>
        </div>

        <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-500">
          <span className="mr-1">%</span>
          Maxsus narxlar
        </div>
      </div>

      {/* Product cards */}
      {dealsProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center">
          <Tag size={42} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-700">
            Hozircha chegirmadagi mahsulotlar yo‘q
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Yangi chegirmalar paydo bo‘lganda shu yerda ko‘rinadi.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {dealsProducts.map((product) => {
            const mainImage =
              product.images?.find((image) => image.isMain)?.url ||
              product.images?.[0]?.url;

            const liked = isLiked(product.id);
            const discountPercent =
              Number(product.discountPercent) ||
              Math.round(
                ((Number(product.oldPrice) - Number(product.price)) /
                  Number(product.oldPrice)) *
                  100,
              );

            return (
              <div
                key={product.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative flex h-[210px] items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                  {mainImage ? (
                    <Image
                      src={
                        mainImage.startsWith("http")
                          ? mainImage
                          : `https://oline-shop-backend.onrender.com${mainImage}`
                      }
                      alt={product.images?.[0]?.alt || product.name}
                      preview={false}
                      className="!h-[210px] !w-full !object-contain !p-3 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-sm text-gray-400">
                      Rasm mavjud emas
                    </div>
                  )}

                  {/* Discount badge */}
                  <div className="absolute left-2 top-2 rounded-lg bg-red-500 px-2.5 py-1.5 text-sm font-extrabold text-white shadow-sm">
                    -{discountPercent}%
                  </div>

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={
                      liked
                        ? "Wishlistdan olib tashlash"
                        : "Wishlistga qo‘shish"
                    }
                    disabled={processingId === product.id}
                    onClick={() => handleWishlist(product.id)}
                    className={`absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-transform duration-200 hover:scale-110 active:scale-90 ${
                      liked ? "bg-pink-100" : "bg-white hover:bg-pink-50"
                    }`}
                  >
                    <Heart
                      size={20}
                      color={liked ? "#ef4444" : "#374151"}
                      fill={liked ? "#ef4444" : "transparent"}
                    />
                  </button>
                </div>

                {/* Product info */}
                <div className="flex flex-1 flex-col px-1 pt-4">
                  <p className="line-clamp-1 text-lg font-bold text-gray-900">
                    {product.name}
                  </p>

                  <p className="mt-1 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                    {product.shortDescription || product.description}
                  </p>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          fill={
                            star <=
                            Math.round(Number(product.averageRating ?? 0))
                              ? "#FACC15"
                              : "transparent"
                          }
                          color="#FACC15"
                        />
                      ))}
                    </div>

                    <span className="text-xs text-gray-500">
                      ({product.reviewsCount ?? 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 line-through">
                      {Number(product.oldPrice).toLocaleString("uz-UZ")} UZS
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-xl font-extrabold text-[#023337]">
                        {Number(product.price).toLocaleString("uz-UZ")} UZS
                      </p>
                      <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                        −{discountPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Add to cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#18a8ad] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#128d92] active:scale-[0.98]"
                  >
                    <ShoppingCartPlus size={19} />
                    Savatga qo‘shish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
