import type { QueryClient } from "@tanstack/react-query";
import type { WishlistResponse } from "../types/WishlistType";

export const wishlistKey = ["wishlist"] as const;

export type WishlistSnapshot = {
  id: string;
  name?: string;
  price?: number;
  oldPrice?: number;
  image?: string;
  images?: { url: string; alt?: string; isMain?: boolean }[];
  brand?: string | { name?: string };
  sku?: string;
  description?: string;
  shortDescription?: string;
  averageRating?: number;
  reviewsCount?: number;
  discountPercent?: number;
  variants?: { id: string }[];
};

type WishlistCacheItem = WishlistResponse["data"]["items"][number];

export function isWishlisted(
  items: { productId?: string; product?: { id?: string } }[] | undefined,
  productId: string,
) {
  return (items ?? []).some(
    (item) => item.productId === productId || item.product?.id === productId,
  );
}

function snapshotProduct(product: WishlistSnapshot | undefined, id: string) {
  const image =
    product?.images?.find((item) => item.isMain)?.url ||
    product?.images?.[0]?.url ||
    product?.image ||
    "";

  const brand =
    typeof product?.brand === "string" ? product.brand : product?.brand?.name ?? "";

  return {
    id,
    name: product?.name ?? "",
    image,
    images: product?.images,
    price: product?.price ?? 0,
    oldPrice: product?.oldPrice,
    brand,
    sku: product?.sku ?? "",
    description: product?.description,
    shortDescription: product?.shortDescription,
    averageRating: product?.averageRating,
    reviewsCount: product?.reviewsCount,
    discountPercent: product?.discountPercent,
    variants: product?.variants,
  };
}

export function addWishlistItem(
  current: WishlistResponse | undefined,
  productId: string,
  product?: WishlistSnapshot,
): WishlistResponse {
  const items = current?.data?.items ?? [];

  if (isWishlisted(items, productId)) {
    return (
      current ?? {
        success: true,
        data: { id: "local", items },
      }
    );
  }

  const nextItem = {
    id: `local-${productId}`,
    productId,
    product: snapshotProduct(product, productId),
  } as WishlistCacheItem;

  return {
    success: true,
    data: {
      id: current?.data?.id ?? "local",
      items: [...items, nextItem],
    },
  };
}

export function removeWishlistItem(
  current: WishlistResponse | undefined,
  productId: string,
): WishlistResponse | undefined {
  if (!current) return current;

  return {
    ...current,
    data: {
      ...current.data,
      items: current.data.items.filter(
        (item) => item.productId !== productId && item.product?.id !== productId,
      ),
    },
  };
}

export async function applyWishlistUpdate(
  queryClient: QueryClient,
  next: (current: WishlistResponse | undefined) => WishlistResponse | undefined,
) {
  await queryClient.cancelQueries({ queryKey: wishlistKey });
  const previous = queryClient.getQueryData<WishlistResponse>(wishlistKey);

  queryClient.setQueryData<WishlistResponse | undefined>(wishlistKey, (current) =>
    next(current),
  );

  return { previous };
}

export function restoreWishlist(
  queryClient: QueryClient,
  previous: WishlistResponse | undefined,
) {
  if (previous) {
    queryClient.setQueryData(wishlistKey, previous);
    return;
  }

  queryClient.removeQueries({ queryKey: wishlistKey });
}
