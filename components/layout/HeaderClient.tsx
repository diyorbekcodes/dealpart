"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Category } from "@/app/(shop)/products/types/ProductsType";

interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

interface HeaderClientProps {
  categoriesData: Category[];
  bannerData: Banner[];
}

export default function HeaderClient({
  categoriesData,
  bannerData,
}: HeaderClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = bannerData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [totalSlides]);

  return (
    <div>
      {/* Top menu */}
      <div className="flex h-[51px] items-center gap-4 overflow-x-auto px-4 scrollbar-hide sm:px-8 lg:px-[65px]">
        {categoriesData.map((item) => (
          <Link
            key={item.id}
            href={`/products?category=${encodeURIComponent(item.slug ?? item.id)}&page=1&limit=20`}
            className="shrink-0 cursor-pointer py-2 text-sm text-[#023337] hover:text-blue-500 sm:text-[16px]"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Custom Banner Carousel */}
      {totalSlides > 0 ? (
        <div className="px-4 sm:px-8 lg:px-[55px]">
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-[30px]">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {bannerData.map((item) => (
                <div
                  key={item.id}
                  className="h-[190px] min-w-full shrink-0 overflow-hidden sm:h-[280px] md:h-[360px] lg:h-[420px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="block h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {totalSlides > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous banner"
                  className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#023337] shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next banner"
                  className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#023337] shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {totalSlides > 1 && (
              <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {bannerData.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to banner ${index + 1}`}
                    className={`h-[9px] rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-7 bg-white"
                        : "w-[9px] bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-[190px] items-center justify-center sm:h-[280px] md:h-[360px] lg:h-[420px]">
          <p>Banner topilmadi</p>
        </div>
      )}
    </div>
  );
}
