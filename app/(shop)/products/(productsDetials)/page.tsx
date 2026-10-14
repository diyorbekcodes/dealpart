"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Package,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";

import { useAddToCart } from "@/hook/AddCart";
import { useProductDetails } from "../hook/useProductDetails";
import { useWishlist } from "../../wishlist/hook/useWishlist";
import useWishlistAdd from "../../wishlist/hook/useWishlistAdd";
import { useRemoveWishlist } from "../../wishlist/hook/useRemoveWishlist";
import { message } from "antd";

type ProductsProps = {
  productId?: string;
};

export default function ProductsDetials({ productId }: ProductsProps) {

  const { product, loading, error } = useProductDetails(productId);
  

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const [selectedImage, setSelectedImage] = useState("");

  const { data: wishlistData } = useWishlist();

  const [processingId, setProcessingId] = useState<string | null>(null);
  const { mutate: addWishlist } = useWishlistAdd();

  const { mutate: removeWishlist } = useRemoveWishlist();
  const wishlistItems = wishlistData?.data?.items ?? [];
  const [optimisticLikes, setOptimisticLikes] = useState<
    Record<string, boolean>
  >({});

  const isLiked = (productId: string) => {
    if (productId in optimisticLikes) {
      return optimisticLikes[productId];
    }

    return wishlistItems.some(
      (item: { productId?: string; product?: { id?: string } }) =>
        item.productId === productId || item.product?.id === productId,
    );
  };
  useEffect(() => {
    if (!product) {
      setSelectedImage("");
      return;
    }

    const mainImage =
      product.images.find((image) => image.isMain) ?? product.images[0];

    setSelectedImage(mainImage?.url ?? "");
  }, [product]);

  const formatPrice = (price: number) => `${price.toLocaleString("uz-UZ")} UZS`;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-[#4EA674]" />
        <span className="ml-3 text-gray-500">Mahsulot yuklanmoqda...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
        <Package className="h-12 w-12 text-gray-400" />
        <p className="text-lg font-semibold text-gray-700">
          {error || "Mahsulot topilmadi"}
        </p>
      </div>
    );
  }

  const availableStock = product.availableStock ?? product.stock;

  const handleAddToCart = () => {
    if (availableStock <= 0 || isAddingToCart) return;

    addToCart({
      productId: product.id,
      variantId: product.variants?.[0]?.id,
      quantity: 1,
    });
  };

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
  const liked = isLiked(product.id);
  const isProcessing = processingId === product.id;
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-8 lg:px-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span>Home</span>
        <ChevronRight size={16} />
        <span>{product.category.name}</span>
        <ChevronRight size={16} />
        <span className="font-medium text-gray-900">{product.name}</span>
      </div>

      {/* Product */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Images */}
        <div className="min-w-0">
          <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-[#F7F8FA] p-6 sm:h-[440px] lg:h-[520px]">
            {product.discountPercent > 0 && (
              <span className="absolute left-5 top-5 z-10 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white">
                -{product.discountPercent}%
              </span>
            )}

            {product.isNew && (
              <span className="absolute right-5 top-5 z-10 rounded-lg bg-[#4EA674] px-3 py-1.5 text-sm font-semibold text-white">
                New
              </span>
            )}

            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <Package size={80} className="text-gray-300" />
            )}
          </div>

          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image.url)}
                  aria-label={`View ${image.alt || product.name}`}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-[#F7F8FA] p-2 transition ${
                    selectedImage === image.url
                      ? "border-[#4EA674]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || product.name}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product information */}
        <div className="flex flex-col">
          <div className="mb-3 relative flex items-center justify-between gap-3">
            <span className="rounded-lg bg-[#EAF5EE] px-3 py-1.5 text-sm font-medium text-[#328653]">
              {product.category.name}
            </span>

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

          <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Brand:{" "}
            <span className="font-semibold text-gray-800">
              {product.brand.name}
            </span>
          </p>

          {/* Rating */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-900">
                {Number(product.averageRating).toFixed(1)}
              </span>
            </div>

            <span className="text-sm text-gray-500">
              ({product.reviewsCount} reviews)
            </span>

            <span className="text-gray-300">|</span>

            <span
              className={`text-sm font-medium ${
                availableStock > 0 ? "text-[#328653]" : "text-red-500"
              }`}
            >
              {availableStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="my-6 border-t border-gray-200" />

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {formatPrice(product.price)}
            </span>

            {product.oldPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {product.oldPrice > product.price && (
            <p className="mt-2 text-sm font-medium text-[#328653]">
              You save {formatPrice(product.oldPrice - product.price)}
            </p>
          )}

          <p className="mt-5 text-base leading-7 text-gray-600">
            {product.shortDescription || product.description}
          </p>

          {/* SKU and stock */}
          <div className="mt-6 space-y-3 rounded-xl bg-gray-50 p-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-500">SKU</span>
              <span className="font-medium text-gray-900">{product.sku}</span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Availability</span>
              <span className="font-medium text-gray-900">
                {availableStock} items
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-900">
                {product.category.name}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={availableStock <= 0 || isAddingToCart}
              onClick={handleAddToCart}
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#4EA674] px-4 font-semibold text-white transition hover:bg-[#3d8d60] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isAddingToCart ? (
                <LoaderCircle size={20} className="animate-spin" />
              ) : (
                <ShoppingCart size={20} />
              )}

              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>

            <button
              type="button"
              disabled={availableStock <= 0}
              className="h-14 rounded-xl border-2 border-[#4EA674] px-4 font-semibold text-[#328653] transition hover:bg-[#EAF5EE] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Buy Now
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-7 grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF5EE]">
                <Truck className="text-[#328653]" size={21} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Fast Delivery
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Delivery to your address
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF5EE]">
                <ShieldCheck className="text-[#328653]" size={21} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Secure Shopping
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Shop with confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mt-12 rounded-2xl border border-gray-200 p-5 sm:mt-16 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">Product Description</h2>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="whitespace-pre-line text-base leading-7 text-gray-600">
            {product.description || product.shortDescription}
          </p>
        </div>
      </section>
    </div>
  );
}
