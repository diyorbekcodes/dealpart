"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CircleArrowOutUpRight } from "lucide-react";

import card6 from "../../assets/img/card6.png";
import card7 from "../../assets/img/card7.png";
import card8 from "../../assets/img/card8.png";
import card9 from "../../assets/img/caed9.png";
import card11 from "../../assets/img/card11.png";
import card12 from "../../assets/img/card12.png";
import { Heart, Star } from "lucide-react";

import { useCategories } from "@/hook/Categories";
import { Spin } from "antd";

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

export default function Main() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [like, setLike] = useState(false);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  const { data: categoriesData, isLoading, isError } = useCategories();
  return (
    <div className="mt-[80px]">
      <section className="product px-[44px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[#000000] text-[32px] text-[700] font-bold">
            Trending Product
          </h1>
          <div>
            <button className="border-[#000000] view-all-btn cursor-pointer border rounded-[200px] px-6 py-3">
              View All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-7">
          <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] p-3 rounded-[12px] flex flex-col justify-center">
            <div className="w-full relative ">
              <Image
                className="w-full h-[100%] rounded-lg"
                src={card6}
                alt="card"
              />
              <div
                onClick={() => setLike((prev) => !prev)}
                className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center bg-white rounded-full cursor-pointer shadow-sm hover:scale-110 active:scale-90 transition-transform duration-200"
              >
                <Heart
                  size={17}
                  style={{
                    color: like ? "#ef4444" : "#374151",
                    fill: like ? "#ef4444" : "transparent",
                  }}
                  className={like ? "heart-animation" : ""}
                />
              </div>
            </div>
            <div>
              <div>
                <p className="text-[22px] text-[700] font-bold">
                  Radiant Glow Hydrating Serum
                </p>
                <p className="text-[16px ] text-[400] text-[#00000099]">
                  Gentle yet effective, our Radiance Boosting Foaming......
                </p>
              </div>
              <div className="flex gap-2 items-center justify-start mt-2">
                <div className="flex gap-1.5">
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                </div>
                <div>
                  <p className="text-[14px]  font-bold text-[#6B7280]">
                    (342 reviews).
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-end mt-2">
                <p className="text-[#4EA674] text-[22px]   font-bold">
                  $29.99{" "}
                  <span className="text-[#00000099] text-[16px]">
                    ($39.99).
                  </span>
                </p>
                <p className="text-[#000000]  font-bold">20% Off</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <p className="text-[#6467F2] text-[16px] cursor-pointer ">
                View Details
              </p>
              <button
                className="px-5 py-2.5 active:scale-95   hover:-translate-y-[2px]
  hover:shadow-[0_6px_20px_rgba(2,51,55,0.25)]  transition-all duration-200 ease-in-out bg-[#4EA674] rounded-[200px] cursor-pointer text-[#FFFFFF]"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[44px] mt-[100px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[#000000] text-[32px] text-[700] font-bold">
            Start exploring now
          </h1>
          <div>
            <button className="border-[#000000] view-all-btn cursor-pointer border rounded-[200px] px-6 py-3">
              View All
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full ">
            <Spin />
          </div>
        ) : (
          <div className="relative mt-[32px]">
            {/* Left arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-[-20px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md border border-[#E5E7EB] hover:bg-gray-50 transition"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="carousel overflow-x-auto scrollbar-none"
            >
              <div className="flex w-max items-center gap-14">
                {/* CARD */}
                {categoriesData?.data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="card flex shrink-0 flex-col items-center rounded-lg border border-[#E5E7EB] px-4 py-5"
                    >
                      <div className="h-[140px] w-[148px]">
                        <img
                          className="h-full w-full object-contain"
                          src={item.image}
                          alt="card"
                        />
                      </div>

                      <p className="mt-4 text-[16px] font-bold text-[#000000]">
                        {item.name}
                      </p>
                    </div>
                  );
                })}

                {/* qolgan cardlaringiz shu yerda */}
              </div>
            </div>

            {/* Right arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-[-20px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md border border-[#E5E7EB] hover:bg-gray-50 transition"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </section>
      <section className="px-[44px] mt-[100px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[#000000] text-[32px] text-[700] font-bold">
            Best selling product
          </h1>
          <div>
            <button className="border-[#000000] view-all-btn cursor-pointer border rounded-[200px] px-6 py-3">
              View All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-8">
          <div>
            <Image src={card8} alt="card" />
          </div>
          <div className=" relative flex justify-center ">
            <Image src={card8} alt="card" />
            <div className=" absolute bottom-4">
              <button className="px-3 py-1 text-[12px] border bg-white rounded-[200px] flex items-centeer gap-2">
                Visit store <CircleArrowOutUpRight size={16} />
              </button>
            </div>
          </div>
          <div className=" relative flex justify-center">
            <Image src={card8} alt="card" />
            <div className=" absolute bottom-4">
              <button className="px-3 py-1 text-[12px] border bg-white rounded-[200px] flex items-centeer gap-2">
                Buy now
              </button>
            </div>
          </div>
          <div className="row-span-2 relative flex justify-center">
            <Image className="rounded-lg" src={card9} alt="card" />
            <div className=" absolute bottom-4">
              <button className="px-3 py-1 text-[12px] border bg-white rounded-[200px] flex items-centeer gap-2">
                Buy now
              </button>
            </div>
          </div>
          <div className="col-span-2 relative flex justify-center">
            <Image className="rounded-lg" src={card11} alt="card" />
            <div className=" absolute bottom-4">
              <button className="px-3 py-1 text-[12px] border bg-white rounded-[200px] flex items-centeer gap-2">
                Buy now
              </button>
            </div>
          </div>
          <div className=" relative flex justify-center">
            <Image src={card8} alt="card" />
            <div className=" absolute bottom-4">
              <button className="px-3 py-1 text-[12px] border bg-white rounded-[200px] flex items-centeer gap-2">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[100px] px-[44px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[#000000] text-[32px] text-[700] font-bold">
            Limited-Time Deal
          </h1>
          <div>
            <button className="border-[#000000] view-all-btn cursor-pointer border rounded-[200px] px-6 py-3">
              View All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-7">
          <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] p-3 rounded-[12px] flex flex-col justify-center">
            <div className="w-full relative ">
              <Image
                className="w-full h-[100%] rounded-lg"
                src={card6}
                alt="card"
              />
              <div
                onClick={() => setLike((prev) => !prev)}
                className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center bg-white rounded-full cursor-pointer shadow-sm hover:scale-110 active:scale-90 transition-transform duration-200"
              >
                <Heart
                  size={17}
                  style={{
                    color: like ? "#ef4444" : "#374151",
                    fill: like ? "#ef4444" : "transparent",
                  }}
                  className={like ? "heart-animation" : ""}
                />
              </div>
            </div>
            <div>
              <div>
                <p className="text-[22px] text-[700] font-bold">
                  Radiant Glow Hydrating Serum
                </p>
                <p className="text-[16px] text-[400] text-[#00000099]">
                  Gentle yet effective, our Radiance Boosting Foaming......
                </p>
              </div>
              <div className="flex gap-2 items-center justify-start mt-2">
                <div className="flex gap-1.5">
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                  <Star fill="yellow" size={16} color="yellow" />
                </div>
                <div>
                  <p className="text-[14px]  font-bold text-[#6B7280]">
                    (342 reviews).
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-end mt-2">
                <p className="text-[#4EA674] text-[22px]   font-bold">
                  $29.99{" "}
                  <span className="text-[#00000099] text-[16px]">
                    ($39.99).
                  </span>
                </p>
                <p className="text-[#000000]  font-bold">20% Off</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <p className="text-[#6467F2] text-[16px] cursor-pointer ">
                View Details
              </p>
              <button
                className="px-5 py-2.5 bg-[#4EA674] active:scale-95   hover:-translate-y-[2px]
  hover:shadow-[0_6px_20px_rgba(2,51,55,0.25)]  transition-all duration-200 ease-in-out
 rounded-[200px] cursor-pointer text-[#FFFFFF]"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[100px] px-[44px]">
        <div className=" flex flex-col items-center">
          <h1 className="text-[#4EA674] text-[32px] font-bold">
            Our Happy Customers
          </h1>
          <p className="text-[#000000] max-w-[642px] text-center mt-3">
            Don’t just take our word for it – see how our products and services
            have delighted customers across the globe, one experience at a time.
          </p>
        </div>
        <div className="relative mt-10 w-full overflow-hidden py-5">
          <div className="group flex w-max items-center gap-6">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="
          shrink-0
          w-[430px]
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
      <div className="flex justify-center items-center mt-[42px]">
        <button
          className="
    px-[33px] py-[15px]
    cursor-pointer
    text-[#FFFFFF]
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
    </div>
  );
}
