"use client";

import logo from "../../assets/img/Frame 4121.png";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  LogIn,
  MapPin,
  Menu,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import Search from "antd/es/input/Search";
import LanguageSelect from "../ui/LanguageSelect";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMe } from "@/app/auth/useMe";
import avatar2 from "../../assets/img/avatar2.png";
import { Badge } from "antd";
import { useCart } from "@/app/(shop)/cart/hook/useCart";
import { useWishlist } from "@/app/(shop)/wishlist/hook/useWishlist";
import { useCategories } from "@/hook/Categories";

export default function Navbar() {
  const { data: cartData } = useCart();
  const cartDatas = cartData?.data.items ?? [];
  const { data: wishlistData } = useWishlist();
  const wishlists = wishlistData?.data.items ?? [];
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data } = useMe();
  const user = data?.data;
  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `https://oline-shop-backend.onrender.com${user.avatar}`
    : avatar2;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data ?? [];

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
            {/* Wishlist */}
            <Badge count={wishlists.length}>
              <Link
                href="/wishlist"
                aria-label="Sevimlilar"
                className="
      group flex h-11 w-11 items-center justify-center
      rounded-xl bg-white/80 text-[#023337]!
      backdrop-blur-md transition-all duration-300
      hover:-translate-y-0.5
      hover:text-blue-500!
      hover:bg-[#4EA674]/10
      hover:text-blue-500
      hover:shadow-md
      active:scale-95
    "
              >
                <Heart
                  size={21}
                  strokeWidth={1.8}
                  className="transition-all duration-300 group-hover:scale-110"
                />
              </Link>
            </Badge>

            {/* Cart */}
            <Badge count={cartDatas.length}>
              <Link
                href="/cart"
                aria-label="Savatcha"
                className="
      group flex h-11 items-center justify-center gap-2
      rounded-xl bg-white/80 px-3  text-[#023337]!
      backdrop-blur-md transition-all duration-300
      hover:-translate-y-0.5
      hover:text-blue-500!
      hover:bg-blue-500
      hover:text-white
      hover:shadow-md
      active:scale-95
    "
              >
                <ShoppingCart
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            </Badge>

            <Link href={data ? "/profil" : "/login"} className="shrink-0">
              {data ? (
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white/70 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95">
                  <Image
                    className="h-full w-full rounded-full object-cover"
                    src={avatarUrl}
                    alt="User avatar"
                    width={96}
                    height={96}
                  />
                </div>
              ) : (
                <div
                  className="
        group flex items-center justify-center gap-2
        whitespace-nowrap rounded-xl
        bg-[#023337] px-5 py-3
        text-sm font-semibold text-white
        shadow-md shadow-[#023337]/20
        transition-all duration-300
        hover:-translate-y-0.5
        hover:bg-blue-500
        hover:shadow-lg
        active:scale-95
      "
                >
                  <LogIn
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span>Kirish</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 2-chi div */}
      <div
        className={`
          absolute top-[90px] left-0 -z-10
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
          <div className="relative">
            {/* Menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="
      flex items-center gap-2.5 p-2 rounded-md
      cursor-pointer bg-transparent
      hover:bg-white/50
      hover:backdrop-blur-lg
      hover:border
      hover:border-white/60
      hover:shadow-sm
    "
            >
              <Menu size={20} />
              <span className="text-[16px] text-[#000000CC]">Menu</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute max-h-[300px] overflow-y-auto scrollbar-hide  left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Categories
                </p>

                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/${category.id}/${encodeURIComponent(category.name)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="
            flex items-center justify-between px-4 py-3
            text-sm text-[#023337] no-underline
            transition-colors hover:bg-[#f0f8f2]
            hover:!text-[#4EA674]
          "
                  >
                    <span>{category.name}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                ))}

                {categories.length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-400">
                    Kategoriyalar mavjud emas
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="border-r h-4 border-r-[#00000099]"></div>

          <Link
            href={"/orders"}
            className="
              p-2 rounded-md cursor-pointer
              hover:bg-white/50
              hover:backdrop-blur-lg
              hover:border
              hover:border-white/60
              hover:shadow-sm
            "
          >
            My orders
          </Link>

          <Link
            href={"/deals"}
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
          </Link>
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
