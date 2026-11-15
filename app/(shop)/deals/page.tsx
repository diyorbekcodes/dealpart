"use client";

import { Spin } from "antd";
import { Tag, Clock } from "lucide-react";
import { useProducts } from "../products/hook/Products";
import CardProduct from "@/components/ui/CardProduct";

export default function Deals() {
  const { data, isLoading, isError } = useProducts();

  const dealsProducts = [...(data?.data ?? [])]
    .filter(
      (product) =>
        Number(product.oldPrice) > Number(product.price) &&
        Number(product.price) > 0,
    )
    .sort(
      (a, b) => Number(b.discountPercent ?? 0) - Number(a.discountPercent ?? 0),
    );

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {dealsProducts.map((product) => {
            const mainImage =
              product.images?.find((image) => image.isMain)?.url ||
              product.images?.[0]?.url;

            return (
              <CardProduct
                key={product.id}
                product={product}
                mainImage={mainImage}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
