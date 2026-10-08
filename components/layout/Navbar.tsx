"use client";

import logo from "../../assets/img/Frame 4121.png";
import Image from "next/image";
import { MapPin, Menu, ShoppingCart, UserRound } from "lucide-react";

import Search from "antd/es/input/Search";
import LanguageSelect from "../ui/LanguageSelect";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMe } from "@/app/auth/useMe";
import avatar2 from "../../assets/img/avatar2.png";
import { Badge } from "antd";
import { useCart } from "@/app/(shop)/cart/hook/useCart";
export default function Navbar() {
  const { data: cartData } = useCart();
  const cartDatas = cartData?.data.items ?? [];

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data, isLoading } = useMe();
  const user = data?.data;
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      {/* 1-chi div */}
      <div className="h-[90px] w-full bg-white/70 backdrop-blur-xl border-b border-b-[#0000001A]">
        <div className="px-25 flex h-full justify-between items-center">
          <div className="flex gap-3 items-center">
            <div>
              <Image src={logo} alt="Logo" />
            </div>

            <div className="flex gap-1 items-center border-l-[#00000099] border-r-[#00000099] border-l border-r px-4">
              <div>
                <MapPin size={32} />
              </div>

              <div className="flex flex-col">
                <p>Deliver to</p>
                <p>Your address</p>
              </div>
            </div>

            <div>
              <LanguageSelect />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-[420px]">
              <Search
                placeholder="Search products..."
                enterButton="Search"
                size="large"
                allowClear
              />
            </div>

            {/* <div className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-md">
              <UserRound size={24} />
            </div> */}

            <Link href={"/cart"}>
              <Badge count={cartDatas.length}>
                <button
                  className="
    relative
    flex
    items-center
    gap-2
    overflow-hidden
    rounded-md
    p-2
    transition-all
    duration-300
    ease-in-out
    hover:text-white
    active:scale-85
    hover:scale-105
    before:absolute
    before:inset-y-0
    before:left-0
    before:w-0
    before:bg-blue-500
    before:transition-all
    before:duration-300
    before:ease-in-out
    hover:before:w-full
  "
                >
                  <ShoppingCart
                    size={20}
                    className="relative z-10 transition-colors duration-300 hover:text-white"
                  />

                  <p className="relative z-10 transition-colors duration-300">
                    Cart
                  </p>
                </button>
              </Badge>
            </Link>
            <div
              className="
    flex
    h-12
    w-12
    cursor-pointer
    items-center
    justify-center
    overflow-hidden
    rounded-full
    bg-white/70
    backdrop-blur-xl
    active:scale-95
    hover:scale-105
    transition-all
    duration-300
    ease-in-out
  "
            >
              <Image
                className="h-full w-full object-cover"
                src={user?.avatar ?? avatar2}
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2-chi div */}
      <div
        className={`
          absolute top-[90px] left-0
          w-full h-[71px]
          flex justify-between items-center
          px-25
          bg-white/70 backdrop-blur-xl
          border-b border-b-[#0000001A]
          transition-all duration-300 ease-in-out
          ${
            showNavbar
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex items-center gap-2.5 p-2 rounded-md
              cursor-pointer
              bg-transparent
              hover:bg-white/50
              hover:backdrop-blur-lg
              hover:border
              hover:border-white/60
              hover:shadow-sm
            "
          >
            <Menu size={20} />
            <p className="text-[16px] text-[#000000CC]">Menu</p>
          </div>

          <div className="border-r h-4 border-r-[#00000099]"></div>

          <div
            className="
              p-2 rounded-md cursor-pointer
              hover:bg-white/50
              hover:backdrop-blur-lg
              hover:border
              hover:border-white/60
              hover:shadow-sm
            "
          >
            Explore
          </div>

          <div
            className="
              p-2 rounded-md cursor-pointer
              hover:bg-white/50
              hover:backdrop-blur-lg
              hover:border
              hover:border-white/60
              hover:shadow-sm
            "
          >
            Deals
          </div>

          <div
            className="
              p-2 rounded-md cursor-pointer
              hover:bg-white/50
              hover:backdrop-blur-lg
              hover:border
              hover:border-white/60
              hover:shadow-sm
            "
          >
            Saved
          </div>
        </div>

        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative
                  py-3
                  text-[16px]
                  font-bold
                  leading-none
                  transition-colors
                  duration-200
                  ${
                    isActive
                      ? "text-[#4EA674]"
                      : "text-black/60 hover:text-[#4EA674]"
                  }
                `}
              >
                {item.name}

                <span
                  className={`
                    absolute
                    left-1/2
                    -bottom-0.5
                    h-[2px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#4EA674]
                    transition-all
                    duration-300
                    ${isActive ? "w-5 opacity-100" : "w-0 opacity-0"}
                  `}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
