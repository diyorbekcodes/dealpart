"use client";

import Image from "next/image";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  CreditCard,
  MapPin,
  CalendarDays,
  UserRound,
  RefreshCw,
} from "lucide-react";

import { useOrdersList } from "./hook/useOrdersList";
import type { Order, OrderStatus, PaymentStatus } from "./types/OrdersListType";

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock;
  }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: Clock,
  },
  PROCESSING: {
    label: "Processing",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: RefreshCw,
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
  },
};

const formatPrice = (price: number) => `${price.toLocaleString("en-US")} UZS`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const paymentStatusLabel: Record<PaymentStatus, string> = {
  UNPAID: "Unpaid",
  PAID: "Paid",
  REFUNDED: "Refunded",
};

const paymentMethodLabel: Record<string, string> = {
  CASH_ON_DELIVERY: "Cash on delivery",
  CARD: "Card",
  ONLINE: "Online payment",
};

export default function Orders() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useOrdersList();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
          <p className="text-sm text-gray-500">Orders loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 px-4">
        <div className="rounded-full bg-red-50 p-4">
          <XCircle className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Failed to load orders
        </h2>

        <p className="text-center text-sm text-gray-500">
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."}
        </p>

        <button
          onClick={() => refetch()}
          className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Try again
        </button>
      </div>
    );
  }

  // API response: { success: true, data: Order[], meta: {...} }
  const orders: Order[] = data?.data ?? [];
  const totalOrders = data?.meta?.total ?? orders.length;

  return (
    <div className="min-h-screen w-full bg-gray-50/70 px-4 py-8 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-sm">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                My Orders
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Track and manage your orders
              </p>
            </div>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total orders</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {totalOrders}
                </p>
              </div>

              <div className="rounded-xl bg-gray-100 p-3">
                <Package className="h-6 w-6 text-gray-700" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending orders</p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {orders.filter((order) => order.status === "PENDING").length}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-50 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Delivered orders</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {
                    orders.filter((order) => order.status === "DELIVERED")
                      .length
                  }
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders list */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">All orders</h2>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {orders.length} orders
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              No orders yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const status = statusConfig[order.status] ?? statusConfig.PENDING;

              const StatusIcon = status.icon;

              const customer = order.customerSnapshot ?? order.user;

              const address = order.addressSnapshot;

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Order header */}
                  <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center md:p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Package className="h-5 w-5 text-gray-700" />

                        <h3 className="font-bold text-gray-900">
                          {order.orderNumber}
                        </h3>

                        <span className="text-xs text-gray-400">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        <span>{formatDate(order.createdAt)}</span>
                        <span className="text-gray-300">•</span>
                        <span>
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "product" : "products"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium ${status.className}`}
                    >
                      <StatusIcon className="h-4 w-4" />
                      {status.label}
                    </div>
                  </div>

                  {/* Customer and address */}
                  <div className="grid grid-cols-1 gap-5 border-b border-gray-100 p-5 sm:grid-cols-2 md:p-6">
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Customer
                      </p>

                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-gray-100 p-2.5">
                          <UserRound className="h-5 w-5 text-gray-600" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {customer?.firstName} {customer?.lastName}
                          </p>

                          <p className="mt-1 break-all text-sm text-gray-500">
                            {customer?.email}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {customer?.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Delivery address
                      </p>

                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-gray-100 p-2.5">
                          <MapPin className="h-5 w-5 text-gray-600" />
                        </div>

                        <div className="text-sm text-gray-600">
                          <p className="font-medium text-gray-900">
                            {address?.title ?? "Delivery address"}
                          </p>

                          <p className="mt-1">
                            {[address?.region, address?.city, address?.district]
                              .filter(Boolean)
                              .join(", ")}
                          </p>

                          <p className="mt-1">
                            {[address?.street, address?.house]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-4 p-5 md:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Order items
                    </p>

                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-24 sm:w-24">
                          {item.productImage ? (
                            <img
                              src={item.productImage}
                              alt={item.productName || "Product"}
                              className="h-full w-full object-contain p-1"
                              onError={(e) => {
                                console.error(
                                  "Rasm yuklanmadi:",
                                  item.productImage,
                                );
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-8 w-8 text-gray-300" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-2 font-semibold text-gray-900">
                            {item.productName}
                          </h4>

                          <p className="mt-1 text-xs text-gray-400">
                            SKU: {item.productSku}
                          </p>

                          <p className="mt-2 text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="font-bold text-gray-900">
                            {formatPrice(item.total)}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {formatPrice(item.price)} / item
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order footer */}
                  <div className="flex flex-col justify-between gap-5 border-t border-gray-100 bg-gray-50/80 p-5 sm:flex-row sm:items-center md:px-6">
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Payment method</p>

                        <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-800">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          {paymentMethodLabel[order.paymentMethod] ??
                            order.paymentMethod}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Payment status</p>

                        <p
                          className={`mt-1 text-sm font-semibold ${
                            order.paymentStatus === "PAID"
                              ? "text-green-600"
                              : order.paymentStatus === "REFUNDED"
                                ? "text-purple-600"
                                : "text-orange-600"
                          }`}
                        >
                          {paymentStatusLabel[order.paymentStatus] ??
                            order.paymentStatus}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Delivery fee</p>

                        <p className="mt-1 text-sm font-medium text-gray-800">
                          {formatPrice(order.deliveryFee)}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 text-left sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
                      <p className="text-sm text-gray-500">Total amount</p>

                      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                        {formatPrice(order.total)}
                      </p>

                      {order.discount > 0 && (
                        <p className="mt-1 text-xs text-green-600">
                          Discount: {formatPrice(order.discount)}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination info */}
        {data?.meta && data.meta.totalPages > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
            <p>
              Showing {orders.length} of {data.meta.total} orders
            </p>

            <p>
              Page {data.meta.page} of {data.meta.totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
