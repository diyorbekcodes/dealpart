"use client";

import logo from "../../assets/img/Frame 4121.png";
import avatar2 from "../../assets/img/avatar2.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  LogIn,
  Menu,
  ShoppingCart,
  X,
  Package,
  Home,
  Info,
  Phone,
  Tag,
  ClipboardList,
} from "lucide-react";
import { Badge } from "antd";

import { useMe } from "@/app/auth/useMe";
import { useCart } from "@/app/(shop)/cart/hook/useCart";
import { useWishlist } from "@/app/(shop)/wishlist/hook/useWishlist";
import { useCategories } from "@/hook/Categories";
import SearchProducts from "../ui/SearchProduct";

export default function Navbar() {
  const pathname = usePathname();

  const { data: cartData } = useCart();
  const { data: wishlistData } = useWishlist();
  const { data, isLoading } = useMe();
  const { data: categoriesData } = useCategories();

  const cartItems = cartData?.data.items ?? [];
  const wishlistItems = wishlistData?.data.items ?? [];
  const categories = categoriesData?.data ?? [];

  const user = data?.data;

  const [mounted, setMounted] = useState(false);
  const [showSecondNavbar, setShowSecondNavbar] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `https://oline-shop-backend.onrender.com${user.avatar}`
    : avatar2;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Faqat ikkinchi navbar uchun scroll boshqaruvi
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 100) {
        setShowSecondNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Pastga scroll
        setShowSecondNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        // Tepaga scroll
        setShowSecondNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Kategoriya menyusidan tashqariga bosilganda yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/* TOP NAVBAR - DOIM KO'RINADI */}
      <div className="relative z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 xl:px-14">
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.03]"
          >
            <Image
              src={logo}
              alt="Logo"
              priority
              className="h-auto w-[115px] object-contain sm:w-[135px]"
            />
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            {/* SEARCH - LIKE TUGMASINING CHAP TOMONIDA */}
            <div className="hidden w-[220px] lg:block xl:w-[320px]">
              <Suspense fallback={null}>
                <SearchProducts />
              </Suspense>
            </div>

            {/* WISHLIST */}
            <Badge count={wishlistItems.length} size="small" offset={[-3, 4]}>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-[#023337] transition-all duration-300 hover:-translate-y-1 hover:border-[#4EA674]/30 hover:bg-[#4EA674]/10 hover:text-[#4EA674] active:scale-95 sm:h-11 sm:w-11"
              >
                <Heart
                  size={20}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            </Badge>

            {/* CART */}
            <Badge count={cartItems.length} size="small" offset={[-3, 4]}>
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-[#023337] transition-all duration-300 hover:-translate-y-1 hover:border-[#4EA674]/30 hover:bg-[#4EA674]/10 hover:text-[#4EA674] active:scale-95 sm:h-11 sm:w-11"
              >
                <ShoppingCart
                  size={20}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            </Badge>

            {/* PROFILE */}
            {!mounted || isLoading ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 sm:h-11 sm:w-11" />
            ) : (
              <Link
                href={user ? "/profil" : "/login"}
                aria-label="Profile"
                className="ml-1 shrink-0"
              >
                {user ? (
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#4EA674]/30 bg-gray-100 transition-all duration-300 hover:scale-105 hover:border-[#4EA674] sm:h-11 sm:w-11">
                    <Image
                      src={avatarUrl}
                      alt="User avatar"
                      width={88}
                      height={88}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 items-center gap-2 rounded-xl bg-[#023337] px-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#4EA674] active:scale-95 sm:h-11 sm:px-5">
                    <LogIn size={18} />
                    <span className="hidden sm:inline">Kirish</span>
                  </div>
                )}
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-[#023337] transition-all hover:bg-[#4EA674]/10 md:hidden"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* SECOND NAVBAR - FAQAT SCROLLDA YASHIRILADI */}
      <div
        className={`relative z-40 hidden border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl transition-all duration-300 md:block ${
          showSecondNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex h-[62px] max-w-[1440px] items-center justify-between gap-3 overflow-x-auto px-4 scrollbar-hide sm:px-6 lg:px-10 xl:px-14">
          {/* LEFT LINKS */}
          <div className="flex items-center gap-2">
            {/* CATEGORY MENU */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 ${
                  isMenuOpen
                    ? "bg-[#023337] text-white"
                    : "bg-[#f5f8f6] text-[#023337] hover:bg-[#e9f4ed] hover:text-[#4EA674]"
                }`}
              >
                <Menu size={18} />
                Categories
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* CATEGORY DROPDOWN */}
              {isMenuOpen && (
                <div className="absolute left-0 top-full z-[60] mt-3 w-[280px] overflow-hidden rounded-2xl border border-gray-100 bg-white py-3 shadow-2xl shadow-[#023337]/10">
                  <div className="px-4 pb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Shop by category
                    </p>
                  </div>

                  <div className="max-h-[350px] overflow-y-auto">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?category=${encodeURIComponent(category.slug ?? category.id)}&page=1&limit=20`}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center justify-between px-4 py-3 text-sm font-medium text-[#023337] transition-colors hover:bg-[#f0f8f2] hover:text-[#4EA674]"
                      >
                        <span>{category.name}</span>
                        <ChevronRight
                          size={16}
                          className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#4EA674]"
                        />
                      </Link>
                    ))}

                    {categories.length === 0 && (
                      <p className="px-4 py-4 text-sm text-gray-400">
                        Kategoriyalar mavjud emas
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/orders"
              className="flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium text-gray-600 transition-all hover:bg-[#f5f8f6] hover:text-[#4EA674]"
            >
              <ClipboardList size={17} />
              My orders
            </Link>

            <Link
              href="/deals"
              className="flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium text-gray-600 transition-all hover:bg-[#f5f8f6] hover:text-[#4EA674]"
            >
              <Tag size={17} />
              Deals
            </Link>
          </div>

          {/* RIGHT NAV LINKS */}
          <nav className="flex shrink-0 items-center gap-4 lg:gap-7">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex h-[62px] items-center text-sm font-semibold transition-colors duration-200 ${
                    active
                      ? "text-[#4EA674]"
                      : "text-gray-500 hover:text-[#4EA674]"
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute bottom-0 left-0 h-[3px] rounded-t-full bg-[#4EA674] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="relative z-40 border-b border-gray-100 bg-white px-4 py-3 md:hidden">
        <Suspense fallback={null}>
          <SearchProducts />
        </Suspense>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-[55] max-h-[calc(100vh-140px)] w-full overflow-y-auto border-t border-gray-100 bg-white shadow-2xl md:hidden">
          <div className="space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#eaf5ed] text-[#4EA674]"
                      : "text-[#023337] hover:bg-gray-50"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </Link>
              );
            })}

            <div className="my-3 border-t border-gray-100" />

            <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              Categories
            </p>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.id}/${encodeURIComponent(category.name)}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[#023337] hover:bg-[#f0f8f2] hover:text-[#4EA674]"
              >
                {category.name}
                <ChevronRight size={16} className="text-gray-400" />
              </Link>
            ))}

            <div className="my-3 border-t border-gray-100" />

            <Link
              href="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#023337] hover:bg-gray-50"
            >
              <ClipboardList size={19} />
              My orders
            </Link>

            <Link
              href="/deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#023337] hover:bg-gray-50"
            >
              <Tag size={19} />
              Deals
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
