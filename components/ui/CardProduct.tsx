import { useRemoveWishlist } from "@/app/(shop)/wishlist/hook/useRemoveWishlist";
import useWishlistAdd from "@/app/(shop)/wishlist/hook/useWishlistAdd";
import { useAddToCart } from "@/hook/AddCart";
import { Image, message } from "antd";
import { Heart, ShoppingCartPlus, Star } from "lucide-react";

import Link from "next/link";

export default function CardProduct({
  product,
  mainImage,
  liked,
  isProcessing,
  isLiked,
  processingId,
  setProcessingId,
  setOptimisticLikes,
}) {
  const { mutate: addWishlist } = useWishlistAdd();

  const { mutate: removeWishlist } = useRemoveWishlist();
  const { mutate: addToCart } = useAddToCart();
  const handleWishlist = (productId: string) => {
    if (processingId !== null) return;

    const wasLiked = isLiked(productId);

    // Yurakni darhol qizil qilish
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

        message.error("Amalni bajarishda xatolik yuz berdi");
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
  return (
    <div>
      <Link
        key={product.id}
        href={`/products/${product.id}`}
        className="relative flex h-full flex-col rounded-[12px] bg-white p-3 shadow-[0px_1px_3px_0px_#00000033] transition-all duration-300 hover:scale-105"
      >
        {/* IMAGE */}
        <div className="relative flex h-[180px] w-full justify-center">
          {mainImage ? (
            <Image
              src={
                mainImage.startsWith("http")
                  ? mainImage
                  : `https://oline-shop-backend.onrender.com${mainImage}`
              }
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
              liked ? "Wishlistdan olib tashlash" : "Wishlistga qo'shish"
            }
            disabled={isProcessing}
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
                {product.oldPrice.toLocaleString("uz-UZ")} UZS
              </p>
            )}

            <div className="flex items-center gap-2">
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
        <div className="mt-auto flex items-center justify-between pt-5">
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
    </div>
  );
}
