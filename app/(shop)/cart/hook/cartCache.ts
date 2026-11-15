import type { QueryClient } from "@tanstack/react-query";
import type { CartItem, CartResponse } from "../types/addCartType";

export const cartKey = ["cart"] as const;

export type CartSnapshot = {
  id: string;
  name?: string;
  slug?: string;
  sku?: string;
  price?: number;
  image?: string;
  images?: { url: string; isMain?: boolean }[];
  brand?: string | { name?: string };
};

type AddInput = {
  productId: string;
  variantId?: string;
  quantity: number;
  product?: CartSnapshot;
};

function productImage(product?: CartSnapshot) {
  return (
    product?.images?.find((image) => image.isMain)?.url ||
    product?.images?.[0]?.url ||
    product?.image ||
    ""
  );
}

function productBrand(product?: CartSnapshot) {
  if (!product?.brand) return "";
  return typeof product.brand === "string" ? product.brand : product.brand.name ?? "";
}

function withTotals(items: CartItem[]) {
  return {
    items,
    itemsCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
  };
}

export function addCartItem(
  current: CartResponse | undefined,
  input: AddInput,
): CartResponse {
  const base: CartResponse = current ?? {
    success: true,
    data: {
      id: "local",
      items: [],
      itemsCount: 0,
      subtotal: 0,
    },
  };

  const variantId = input.variantId ?? null;
  const items = base.data.items.map((item) => ({ ...item }));
  const existing = items.find(
    (item) =>
      item.productId === input.productId && (item.variantId ?? null) === variantId,
  );

  if (existing) {
    existing.quantity += input.quantity;
    existing.lineTotal = existing.price * existing.quantity;
  } else {
    const price = input.product?.price ?? 0;
    items.push({
      id: `local-${input.productId}-${variantId ?? "base"}`,
      productId: input.productId,
      variantId,
      quantity: input.quantity,
      price,
      lineTotal: price * input.quantity,
      product: {
        id: input.productId,
        name: input.product?.name ?? "",
        slug: input.product?.slug ?? "",
        sku: input.product?.sku ?? "",
        isActive: true,
        image: productImage(input.product),
        brand: productBrand(input.product),
      },
      variant: null,
    });
  }

  return {
    success: true,
    data: {
      ...base.data,
      ...withTotals(items),
    },
  };
}

export function removeCartItem(
  current: CartResponse | undefined,
  id: string,
): CartResponse | undefined {
  if (!current) return current;

  const items = current.data.items.filter((item) => item.id !== id);

  return {
    ...current,
    data: {
      ...current.data,
      ...withTotals(items),
    },
  };
}

export function emptyCart(current: CartResponse | undefined): CartResponse {
  return {
    success: true,
    data: {
      id: current?.data.id ?? "local",
      items: [],
      itemsCount: 0,
      subtotal: 0,
    },
  };
}

export async function applyCartUpdate(
  queryClient: QueryClient,
  next: (current: CartResponse | undefined) => CartResponse | undefined,
) {
  await queryClient.cancelQueries({ queryKey: cartKey });
  const previous = queryClient.getQueryData<CartResponse>(cartKey);

  queryClient.setQueryData<CartResponse | undefined>(cartKey, (current) =>
    next(current),
  );

  return { previous };
}

export function restoreCart(
  queryClient: QueryClient,
  previous: CartResponse | undefined,
) {
  if (previous) {
    queryClient.setQueryData(cartKey, previous);
    return;
  }

  queryClient.removeQueries({ queryKey: cartKey });
}
