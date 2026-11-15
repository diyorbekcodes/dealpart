"use client";
import { Product } from "@/app/(shop)/products/types/ProductsType";
import { useRemoveWishlist } from "@/app/(shop)/wishlist/hook/useRemoveWishlist";
import { useWishlist } from "@/app/(shop)/wishlist/hook/useWishlist";
import useWishlistAdd from "@/app/(shop)/wishlist/hook/useWishlistAdd";
import { useAddToCart } from "@/hook/AddCart";
import { message } from "antd";
import { Heart, ShoppingCartPlus, Star } from "lucide-react";

import { isWishlisted } from "@/app/(shop)/wishlist/hook/wishlistCache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
type CardProductProps = {
  product: Product;
  mainImage: string;
};
function productImageSrc(url: string) {
  if (url.startsWith("http")) return url;
  return `https://oline-shop-backend.onrender.com${url}`;
}

function CardProduct({ product, mainImage }: CardProductProps) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { data: wishlistData } = useWishlist();
  const liked = isWishlisted(wishlistData?.data?.items, product.id);

  const { mutate: addWishlist } = useWishlistAdd();
  const { mutate: removeWishlist } = useRemoveWishlist();
  const { mutate: addToCart } = useAddToCart();
  const handleWishlist = (productId: string) => {
    if (processingId !== null) return;

    if (!localStorage.getItem("crmAccessToken")) {
      router.push("/login");
      return;
    }

    setProcessingId(productId);

    const callbacks = {
      onError: () => {
        message.error("Amalni bajarishda xatolik yuz berdi");
      },
      onSettled: () => {
        setProcessingId(null);
      },
    };

    if (liked) {
      removeWishlist(productId, callbacks);
    } else {
      addWishlist({ id: productId, product }, callbacks);
    }
  };
  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      useGrouping: true,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace(/,/g, " ");
  }
  return (
    <div>
        <Link
        key={product.id}
        href={`/products/${product.id}`}
        prefetch={false}
        className="relative flex h-full min-w-0 flex-col rounded-[12px] bg-white p-3 shadow-[0px_1px_3px_0px_#00000033] transition-all duration-300 sm:hover:scale-[1.02]"
      >
        {/* IMAGE */}
        <div className="relative flex h-[180px] w-full justify-center">
          {mainImage ? (
            <img
              src={productImageSrc(mainImage)}
              alt={product.images?.[0]?.alt || product.name}
              loading="lazy"
              decoding="async"
              className="h-[180px] w-full bg-white object-contain"
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
              liked ? "Wishlistdan olib tashlash" : "Wishlistga qo'shish"
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlist(product.id);
            }}
            className={`absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 active:scale-90 ${
              liked ? "bg-pink-100" : "bg-white hover:bg-pink-50"
            }`}
          >
            <Heart
              size={19}
              color={liked ? "#ef4444" : "#374151"}
              fill={liked ? "#ef4444" : "transparent"}
              className="transition-none"
            />
          </button>
        </div>

        {/* INFO */}
        <div className="mt-3">
          <p className="line-clamp-1 text-[22px] font-bold">{product.name}</p>

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
                    star <= Math.round(product.averageRating)
                      ? "yellow"
                      : "transparent"
                  }
                  color="yellow"
                />
              ))}
            </div>

            <p className="text-[14px] font-bold text-[#6B7280]">
              ({product.reviewsCount} reviews)
            </p>
          </div>

          {/* PRICE */}
          <div className="mt-2 flex flex-col gap-2">
            {product.oldPrice > product.price && (
              <p className="text-[16px] text-[#00000099] line-through">
                {formatPrice(product.oldPrice)} UZS
              </p>
            )}

            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-[#0c4bfa] sm:text-[22px]">
                {formatPrice(product.price)} UZS
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
        <div className="mt-auto flex items-center justify-center pt-5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({
                productId: product.id,
                variantId: product.variants?.[0]?.id,
                quantity: 1,
              });
            }}
            className="w-full
    group
    flex items-center justify-center gap-2
    cursor-pointer
    rounded-xl
    bg-[#023337]
    px-3 py-2.5
    text-[13px] font-semibold text-white
    sm:px-6 sm:py-3 sm:text-[14px]
    shadow-md shadow-[#023337]/15
    transition-all duration-300 ease-in-out
    hover:-translate-y-1
    hover:bg-[#03484d]
    hover:shadow-lg hover:shadow-[#023337]/25
    active:translate-y-0
    active:scale-95
  "
          >
            <ShoppingCartPlus
              size={19}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span>Add to cart</span>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default memo(CardProduct);
