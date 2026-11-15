"use client";

import Image from "next/image";

import Link from "next/link";

import card12 from "../../assets/img/card12.png";
import { Star } from "lucide-react";

import { useBrand } from "@/app/(shop)/brand/hook/useBrand";

import CardProduct from "../ui/CardProduct";
import { Product } from "@/app/(shop)/products/types/ProductsType";

import { useMe } from "@/app/auth/useMe";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Emily R.",
    text: "Fast delivery and fantastic quality! The customer support team was quick to resolve my query. Dealport has earned a loyal customer.",
    image: card12,
  },
  {
    name: "James W.",
    text: "Amazing experience from start to finish! The products are high quality and delivery was much faster than expected.",
    image: card12,
  },
  {
    name: "Sarah M.",
    text: "Great service and excellent quality. I will definitely order again. Dealport has become one of my favorite stores.",
    image: card12,
  },
  {
    name: "Michael B.",
    text: "Everything arrived perfectly packed and on time. Customer support was also very helpful and professional.",
    image: card12,
  },
  {
    name: "Olivia K.",
    text: "Very happy with my purchase. The quality exceeded my expectations and the delivery was super fast.",
    image: card12,
  },
];

export default function MainContext({ product }: { product: Product[] }) {
  const { data: Me, isLoading } = useMe();
  const { data } = useBrand();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const products = product ?? [];

  return (
    <div className="mt-10 md:mt-16">
      <section className="product px-4 sm:px-6 lg:px-11">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#023337] sm:text-[32px]">
              Trending Product
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Discover our most popular products
            </p>
          </div>

          <Link
            href="/products"
            className="border border-[#023337] view-all-btn cursor-pointer rounded-[200px] px-6 py-3 transition hover:bg-[#023337] hover:text-white"
          >
            View All
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products
            .slice(-8)
            .reverse()
            .map((product: Product) => {
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
      </section>

      <section className="px-4 sm:px-6 lg:px-11 mt-16 md:mt-24">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#023337] sm:text-[32px]">
              Best selling product
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Explore products loved by our customers
            </p>
          </div>

          <Link
            href="/products"
            className="border border-[#023337] view-all-btn cursor-pointer rounded-[200px] px-6 py-3 transition hover:bg-[#023337] hover:text-white"
          >
            View All
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products
            .slice(-8)
            .reverse()
            .map((product: Product) => {
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
      </section>
      <section className="mt-16 md:mt-24 px-4 sm:px-6 lg:px-11">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#000000] sm:text-[32px]">
            Top Brands
          </h1>
          <div>
            <Link href={"/brand"}>
              <button className="border-[#000000] view-all-btn cursor-pointer border rounded-[200px] px-6 py-3">
                View All
              </button>
            </Link>
          </div>
        </div>
        <div className="relative mt-10 w-full overflow-hidden py-5">
          <div className="carousel-track flex w-max items-center gap-6">
            {[...(data?.data ?? []), ...(data?.data ?? [])].map(
              (item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex h-[110px] w-[185px] shrink-0 items-center justify-center rounded-lg bg-white p-5 shadow-[0px_1px_3px_0px_#00000033]"
                >
                  <Link
                    key={`${item.id}-${index}`}
                    href={`/products?brand=${item.slug}`}
                    className="flex h-[110px] w-[185px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="h-[70px] w-full object-contain"
                    />
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="mt-16 md:mt-24 px-4 sm:px-6 lg:px-11">
        <div className=" flex flex-col items-center">
          <h1 className="px-4 text-center text-2xl font-bold text-[#4EA674] sm:text-[32px]">
            Our Happy Customers
          </h1>
          <p className="mt-3 max-w-[642px] px-4 text-center text-[#000000]">
            Don’t just take our word for it – see how our products and services
            have delighted customers across the globe, one experience at a time.
          </p>
        </div>
        <div className="relative mt-10 w-full overflow-hidden py-5">
          <div className="carousel-track flex w-max items-center gap-6">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="
          shrink-0
          w-[min(430px,82vw)]
          min-h-[220px]
          rounded-lg
          bg-[#EAF8E7]
          p-5
          shadow-[0px_1px_3px_0px_#00000033]
        "
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={52}
                    height={52}
                    className="rounded-full object-cover"
                  />

                  <p className="text-[18px] font-semibold">{item.name}</p>

                  <div className="ml-auto flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} fill="yellow" color="yellow" />
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-[17px] leading-7 text-[#000000]">
                  “{item.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {mounted && !isLoading && !Me?.data && (
        <div className="flex justify-center items-center mt-[42px]">
          <button
            onClick={() => router.push("/login")}
            className="
        px-[33px] py-[15px]
        cursor-pointer
        text-white
        font-bold
        rounded-[200px]
        bg-[#023337]
        transition-all duration-200 ease-in-out
        hover:-translate-y-[2px]
        hover:shadow-[0_6px_14px_rgba(2,51,55,0.35)]
        active:scale-95
        active:shadow-[0_2px_8px_rgba(2,51,55,0.6)]
      "
          >
            GET STARTED
          </button>
        </div>
      )}
    </div>
  );
}
