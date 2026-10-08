"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "./hook/useCart";
import { useUpdateCartItem } from "./hook/useUpdateCartItem";
import { useRemoveItem } from "./hook/useRemoveItem";
import { useRemoveAll } from "./hook/useRemoveAll";

export default function Cart() {
  const { data, isLoading } = useCart();
  const { mutate: removeItem } = useRemoveItem();
  const { mutate: clearCart } = useRemoveAll();
  const cartData = data?.data;

  const cartItems = cartData?.items ?? [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };
  const { mutate: updateCartItem } = useUpdateCartItem();
  // Loading
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8">
            <div className="h-10 w-56 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-3 h-5 w-80 animate-pulse rounded-lg bg-gray-200" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[24px] border border-gray-200 bg-white p-6">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex gap-5 border-b border-gray-100 py-5 last:border-b-0"
                >
                  <div className="h-28 w-28 animate-pulse rounded-2xl bg-gray-200" />

                  <div className="flex-1">
                    <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
                    <div className="mt-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-5 h-9 w-28 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-64 animate-pulse rounded-[24px] bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  // Empty cart
  if (!cartItems.length) {
    return (
      <main className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8">
            <h1 className="text-[32px] font-semibold text-[#023337]">
              Shopping Cart
            </h1>

            <p className="mt-2 text-[15px] text-gray-500">
              Review your items and complete your purchase.
            </p>
          </div>

          <div className="rounded-[24px] border border-gray-200 bg-white px-6 py-16 shadow-sm">
            <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
              <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#eaf8e7]">
                <ShoppingBag size={38} strokeWidth={1.7} color="#4EA674" />
              </div>

              <h2 className="mt-6 text-[24px] font-semibold text-[#023337]">
                Your cart is empty
              </h2>

              <p className="mt-2 text-[15px] leading-6 text-gray-500">
                Looks like you haven't added anything to your cart yet. Start
                shopping and find something you love.
              </p>

              <Link
                href="/products"
                className="
                  mt-7
                  rounded-full
                  bg-[#023337]
                  px-8
                  py-3
                  text-[15px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:bg-[#03484d]
                  hover:shadow-lg
                "
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-semibold text-[#023337]">
            Shopping Cart
          </h1>

          <p className="mt-2 text-[15px] text-gray-500">
            You have {cartData?.itemsCount}{" "}
            {cartData?.itemsCount === 1 ? "item" : "items"} in your cart.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-5">
              <h2 className="text-[20px] font-semibold text-[#023337]">
                Cart Items
              </h2>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="
        rounded-full
        px-3
        py-1
        text-[13px]
        font-semibold
        text-red-500
        transition-all
        duration-200
        hover:bg-red-50
        active:scale-95
      "
                >
                  Clear Cart
                </button>

                <span className="rounded-full bg-[#eaf8e7] px-3 py-1 text-[13px] font-semibold text-[#4EA674]">
                  {cartData?.itemsCount} items
                </span>
              </div>
            </div>

            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    flex-col
                    gap-5
                    border-b
                    border-gray-100
                    py-6
                    last:border-b-0
                    sm:flex-row
                    sm:items-center
                  "
                >
                  {/* Image */}
                  <div className="flex h-[130px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-[#f7f8f8] sm:h-[130px] sm:w-[130px]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-contain p-3"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[18px] font-semibold text-[#023337]">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-[13px] text-gray-400">
                          {item.product.brand}
                        </p>

                        <p className="mt-1 text-[12px] text-gray-400">
                          SKU: {item.product.sku}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem({ id: item.id })}
                        type="button"
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-gray-400
                          transition-all
                          duration-200
                          hover:bg-red-50
                          hover:text-red-500
                          active:scale-90
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity */}
                      <div
                        className="
                          flex
                          items-center
                          rounded-full
                          border
                          border-gray-200
                          bg-white
                          p-1
                        "
                      >
                        <button
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateCartItem({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          }
                          type="button"
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            text-gray-500
                            transition-all
                            hover:bg-gray-100
                            active:scale-90
                          "
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-[35px] text-center text-[14px] font-semibold text-[#023337]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateCartItem({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          type="button"
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            text-gray-500
                            transition-all
                            hover:bg-[#eaf8e7]
                            hover:text-[#4EA674]
                            active:scale-90
                          "
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-[13px] text-gray-400">
                          {formatPrice(item.price)} UZS × {item.quantity}
                        </p>

                        <p className="mt-1 text-[18px] font-bold text-[#023337]">
                          {formatPrice(item.lineTotal)} UZS
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="h-fit rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-[180px]">
            <h2 className="text-[20px] font-semibold text-[#023337]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-gray-500">
                  Items ({cartData?.itemsCount})
                </span>

                <span className="font-medium text-[#023337]">
                  {formatPrice(cartData?.subtotal ?? 0)} UZS
                </span>
              </div>

              <div className="flex items-center justify-between text-[15px]">
                <span className="text-gray-500">Delivery</span>

                <span className="font-medium text-[#4EA674]">Free</span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[17px] font-semibold text-[#023337]">
                    Total
                  </span>

                  <span className="text-[22px] font-bold text-[#023337]">
                    {formatPrice(cartData?.subtotal ?? 0)} UZS
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-[14px]
                bg-[#023337]
                px-5
                py-3.5
                text-[15px]
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-[2px]
                hover:bg-[#03484d]
                hover:shadow-lg
                active:translate-y-0
              "
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <Link
              href="/products"
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                rounded-[14px]
                border
                border-gray-200
                px-5
                py-3
                text-[14px]
                font-semibold
                text-[#023337]
                transition-all
                duration-200
                hover:border-[#4EA674]
                hover:text-[#4EA674]
              "
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
