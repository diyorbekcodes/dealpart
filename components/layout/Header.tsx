"use client";
import Image from "next/image";
import { Carousel, Skeleton } from "antd";
import hero from "../../assets/img/hero.png";
import card from "../../assets/img/card.png";
import card2 from "../../assets/img/card2.png";
import card3 from "../../assets/img/card3.png";
import card4 from "../../assets/img/card4.png";
import card5 from "../../assets/img/card5.png";
import { useCategories } from "@/hook/Categories";
import { useBanner } from "@/hook/Banner";
export default function Header() {
  const onChange = (currentSlide: number) => {};
  const { data: categoriesData, isLoading, isError } = useCategories();
  const { data: bannerData, isLoading: bannerLoading } = useBanner();


  return (
    <div>
      {/* Top menu */}
      <div className="flex h-[51px] items-center px-25">
        {categoriesData?.data?.map((item) => {
          return (
            <p
              key={item.id}
              className="cursor-pointer px-[10px] hover:text-blue-500 py-2 text-[16px] text-[#023337]"
            >
              {item.name}
            </p>
          );
        })}
      </div>

      {/* Carousel */}
      {bannerLoading ? (
        <div className="relative h-[450px] w-full overflow-hidden bg-[#e5e7eb]">
          {/* Background */}
          <div className="absolute inset-0 animate-pulse bg-[#d1d5db]" />

          {/* Text skeleton */}
          <div className="relative z-10 flex h-full items-start px-25 pt-[87px]">
            <div className="flex w-[385px] flex-col gap-4">
              <div className="h-[38px] w-[260px] animate-pulse rounded-lg bg-[#b8bec5]" />

              <div className="h-[28px] w-[350px] animate-pulse rounded-lg bg-[#b8bec5]" />

              <div className="mt-4 h-[48px] w-[170px] animate-pulse rounded-full bg-[#b8bec5]" />
            </div>
          </div>
        </div>
      ) : bannerData?.data?.length ? (
        <Carousel
          afterChange={onChange}
          autoplay
          autoplaySpeed={3000}
          arrows
          dots
        >
          {bannerData.data.map((item) => (
            <div key={item.id}>
              <div className="relative h-[450px] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(2,51,55,0)_0%,#023337_100%)]" />

                <div className="relative z-10 flex h-full px-25 pt-[87px]">
                  <div className="max-w-[385px] text-white">
                    <h1 className="text-[32px] font-normal">{item.title}</h1>

                    <p className="mt-2 text-[20px]">{item.subtitle}</p>

                    <button
                      className="
                  mt-6
                  rounded-[200px]
                  px-[53px]
                  py-[11.5px]

                  bg-[rgba(234,248,231,0.75)]
                  backdrop-blur-[12px]
                  border border-white/40

                  text-[#023337]
                  font-bold
                  cursor-pointer

                  shadow-[0_4px_20px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]

                  transition-all
                  duration-300
                  ease-out

                  hover:bg-[rgba(255,255,255,0.9)]
                  hover:backdrop-blur-[16px]
                  hover:-translate-y-[2px]
                  hover:scale-[1.03]
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.8)]

                  active:translate-y-[1px]
                  active:scale-[0.96]
                  active:shadow-[0_3px_10px_rgba(0,0,0,0.15)]
                "
                    >
                      {item.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="flex h-[450px] items-center justify-center">
          <p>Banner topilmadi</p>
        </div>
      )}
      {/* <div className="grid grid-cols-3 gap-3 px-[44px] -mt-[80px] relative z-10">
        <div className="bg-[#FFFFFF] rounded-[12px] flex flex-col items-center  shadow-[0px_1px_3px_0px_#00000033] px-6 pt-4 pb-10">
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="text-[22px] text-[#000000]">New Year! New Fashion</p>
            <div className="relative flex items-center justify-center   ">
              <Image src={card} alt="card" width={425} height={244} />
              <div className="absolute -bottom-[20px] ">
                <button className="mt-6 btn-effect  rounded-[200px] bg-[#EAF8E7] px-[53px] py-[11.5px] font-bold cursor-pointer text-[#023337] transition ">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] rounded-[12px] flex flex-col items-center justify-center shadow-[0px_1px_3px_0px_#00000033] px-6  ">
          <div className="flex flex-col items-start justify-center gap-4 w-full">
            <div className="flex justify-between items-center w-full">
              <p className="text-[22px] text-[#000000]">Gaming accessories</p>
              <a href="#" className="text-[14px] text-[#6467F2]">
                See more
              </a>
            </div>
            <div className="relative grid grid-cols-2 gap-3 w-full   ">
              <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] flex justify-center items-center relative rounded-[12px]">
                <Image src={card2} alt="card" width={117} height={117} />
                <p className=" absolute left-[10px] bottom-[10px] text-[12px]">
                  Headsets
                </p>
              </div>
              <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] flex justify-center items-center relative rounded-[12px]">
                <Image src={card2} alt="card" width={117} height={117} />
                <p className=" absolute left-[10px] bottom-[10px] text-[12px]">
                  Headsets
                </p>
              </div>
              <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] flex justify-center items-center relative rounded-[12px]">
                <Image src={card2} alt="card" width={117} height={117} />
                <p className=" absolute left-[10px] bottom-[10px] text-[12px]">
                  Headsets
                </p>
              </div>
              <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] flex justify-center items-center relative rounded-[12px]">
                <Image src={card2} alt="card" width={117} height={117} />
                <p className=" absolute left-[8px] bottom-[10px] text-[12px]">
                  Headsets
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="w-[188px] !h-[146px]">
            <Image className="w-full h-[100%]" src={card3} alt="card" />
          </div>
          <div className="w-[188px] !h-[146px]">
            <Image className="w-full h-[100%]" src={card3} alt="card" />
          </div>
          <div className="col-span-2 bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] rounded-[12px] p-4">
            <div className="col-span-2 flex  items-center ">
              <div className=" relative">
                <Image src={card4} alt="card" width={210} height={163} />
                <div className="text-[#FFFFFF] text-[700]  absolute top-0 -right-[40px] flex font-bold text-[8px] bg-[#2924AE] rounded-br-full rounded-tl-full px-[18px] py-[3px]">
                  $250 Off
                </div>
              </div>

              <div className="flex flex-col relative">
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] text-[500] text-[#000000] font-medium">
                    Philips 4K Ambilight TV
                  </p>
                  <p className="text-[14px] text-[#000000] font-bold">
                    $750.99
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end ">
              <button className="btn-effect -mt-8 rounded-[200px] bg-[#EAF8E7] px-[35px] py-[7.5px] font-bold cursor-pointer text-[#023337] transition ">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-[44px] grid grid-cols-4 gap-3">
        <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] rounded-[12px] ">
          <Image src={card5} alt="card" width={327} height={190} />
        </div>
        <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] rounded-[12px] ">
          <Image src={card5} alt="card" width={327} height={190} />
        </div>
        <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] rounded-[12px] ">
          <Image src={card5} alt="card" width={327} height={190} />
        </div>
        <div className="bg-[#FFFFFF] shadow-[0px_1px_3px_0px_#00000033] rounded-[12px] ">
          <Image src={card5} alt="card" width={327} height={190} />
        </div>
      </div> */}
    </div>
  );
}
