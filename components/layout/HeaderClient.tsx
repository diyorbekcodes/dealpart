"use client";


import { Carousel } from "antd";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image?: string;
}

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
  const onChange = (currentSlide: number) => {};

  return (
    <div>
      {/* Top menu */}
      <div className="flex h-[51px] items-center px-25">
        {categoriesData.map((item) => (
          <Link
            key={item.id}
             href={`/products/${item.id}/${encodeURIComponent(item.name)}`}
            className="cursor-pointer px-[10px] py-2 text-[16px] text-[#023337] hover:text-blue-500"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Banner Carousel */}
      {bannerData.length > 0 ? (
        <Carousel
          afterChange={onChange}
          autoplay
          autoplaySpeed={3000}
          arrows
          dots
        >
          {bannerData.map((item) => (
            <div key={item.id}>
              <div className="relative h-screen w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-contain"
                />

               
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="flex h-[450px] items-center justify-center">
          <p>Banner topilmadi</p>
        </div>
      )}

      
    </div>
  );
}