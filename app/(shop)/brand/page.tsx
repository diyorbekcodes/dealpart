"use client";
import Link from "next/link";
import { useBrand } from "./hook/useBrand";
import { Sparkles } from "lucide-react";

export default function Brand() {
  const { data } = useBrand();

  return (
    <section className="mt-12 px-[44px] w-full">
      {/* Section Header */}
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#4EA674]/10 px-3 py-1.5 text-sm font-medium text-[#4EA674]">
            <Sparkles size={15} />
            <span>Top brendlar</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#023337] sm:text-3xl">
            Mashhur brendlar
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Sevimli brendlaringizni kashf eting va o‘zingizga mos mahsulotlarni
            toping.
          </p>
        </div>
      </div>

      <div className="relative mt-10 w-full overflow-hidden py-5">
        <div className="carousel-track flex w-max items-center gap-6">
          {[...(data?.data ?? []), ...(data?.data ?? [])].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex h-[110px] w-[185px] shrink-0 items-center justify-center rounded-lg bg-white p-5 shadow-[0px_1px_3px_0px_#00000033]"
            >
              <Link
                href={`/products/${item.id}`}
                className="flex h-full w-full items-center justify-center"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-[70px] w-full object-contain"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
