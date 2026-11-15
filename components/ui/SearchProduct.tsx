"use client";

import { Search, X, Tag, Package, Layers } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";

let catalogPromise: Promise<SearchProduct[]> | null = null;

function loadSearchCatalog() {
  if (!catalogPromise) {
    catalogPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Mahsulotlarni yuklashda xatolik");
        }

        const result = await response.json();
        return (result.data ?? []) as SearchProduct[];
      })
      .catch((error) => {
        catalogPromise = null;
        throw error;
      });
  }

  return catalogPromise;
}

interface SearchProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  images?: {
    url: string;
    isMain: boolean;
  }[];
  category?: {
    id: string;
    name: string;
  };
  brand?: {
    id: string;
    name: string;
    logo?: string;
  };
}

export default function SearchProducts() {
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [catalogReady, setCatalogReady] = useState(false);

  useEffect(() => {
    if (!isExpanded) return;

    let cancelled = false;

    loadSearchCatalog()
      .then((items) => {
        if (!cancelled) setProducts(items);
      })
      .catch((error) => {
        console.error("Search products error:", error);
      })
      .finally(() => {
        if (!cancelled) setCatalogReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isExpanded]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // URL dagi qidiruvni inputga saqlash
  useEffect(() => {
    const value = searchParams.get("search") || "";
    setSearch(value);

    if (value) {
      setIsExpanded(true);
    }
  }, [searchParams]);

  const normalizedSearch = search.trim().toLowerCase();

  // Product qidirish
  const filteredProducts = products
    .filter((product) => product.name?.toLowerCase().includes(normalizedSearch))
    .slice(0, 5);

  // Takrorlanmagan kategoriyalar
  const filteredCategories = Array.from(
    new Map(
      products
        .filter((product) =>
          product.category?.name?.toLowerCase().includes(normalizedSearch),
        )
        .map((product) => [product.category!.id, product.category!]),
    ).values(),
  ).slice(0, 4);

  // Takrorlanmagan brendlar
  const filteredBrands = Array.from(
    new Map(
      products
        .filter((product) =>
          product.brand?.name?.toLowerCase().includes(normalizedSearch),
        )
        .map((product) => [product.brand!.id, product.brand!]),
    ).values(),
  ).slice(0, 4);

  const hasResults =
    filteredProducts.length > 0 ||
    filteredCategories.length > 0 ||
    filteredBrands.length > 0;

  // Umumiy qidiruv
  const handleSearch = () => {
    const value = search.trim();

    setShowDropdown(false);

    if (!value) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(value)}`);
  };

  // Product sahifasi
  const handleProductClick = (product: SearchProduct) => {
    setShowDropdown(false);
    setIsExpanded(false);

    router.push(`/products/${product.id}/${product.slug}`);
  };

  // Category sahifasi
  const handleCategoryClick = (categoryId: string) => {
    setShowDropdown(false);
    setIsExpanded(false);

    router.push(`/products?categoryId=${categoryId}`);
  };

  // Brand sahifasi
  const handleBrandClick = (brandId: string) => {
    setShowDropdown(false);
    setIsExpanded(false);

    router.push(`/products?brandId=${brandId}`);
  };

  // Searchni yopish
  const handleClose = () => {
    setShowDropdown(false);
    setIsExpanded(false);
    setSearch("");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-[600px]">
      {/* Search button va input */}
      <div className="flex items-center justify-end">
        {!isExpanded ? (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex h-11 w-11 border border-gray-100 hover:-translate-y-1 hover:border-[#4EA674]/30 cursor-pointer items-center justify-center rounded-xl  hover:shadow-md  bg-white/80   text-blue-500 transition-all active:scale-95"
          >
            <Search size={20} />
          </button>
        ) : (
          <div className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white p-1 shadow-sm transition-all duration-300 focus-within:border-[#4EA674] focus-within:shadow-md">
            <Search className="ml-3 shrink-0 text-gray-400" size={19} />

            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();

                if (e.key === "Escape") {
                  setShowDropdown(false);
                  setIsExpanded(false);
                }
              }}
              placeholder="Search products..."
              className="h-9 w-full bg-transparent text-sm text-[#023337]  outline-none placeholder:text-gray-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setShowDropdown(false);
                  router.push("/products");
                }}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="button"
              onClick={handleSearch}
              className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white transition-all  active:scale-95"
            >
              <Search size={15} />
              Search
            </button>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isExpanded && showDropdown && normalizedSearch && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />

          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[450px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
            {!catalogReady ? (
              <p className="px-4 py-6 text-center text-sm text-gray-500">
                Qidirilmoqda...
              </p>
            ) : !hasResults ? (
              <p className="px-4 py-6 text-center text-sm text-gray-500">
                Hech qanday natija topilmadi
              </p>
            ) : (
              <>
                {/* Products */}
                {filteredProducts.length > 0 && (
                  <div className="p-2">
                    <div className="flex items-center gap-2 px-2 py-2 text-xs font-semibold uppercase text-gray-400">
                      <Package size={15} />
                      Products
                    </div>

                    {filteredProducts.map((product) => {
                      const mainImage =
                        product.images?.find((image) => image.isMain)?.url ||
                        product.images?.[0]?.url;

                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductClick(product)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50"
                        >
                          {mainImage ? (
                            <img
                              src={mainImage}
                              alt={product.name}
                              className="h-11 w-11 rounded-lg object-contain"
                            />
                          ) : (
                            <div className="h-11 w-11 rounded-lg bg-gray-100" />
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#023337]">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-[#4EA674]">
                              {product.price?.toLocaleString()} so'm
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Categories */}
                {filteredCategories.length > 0 && (
                  <div className="border-t border-gray-100 p-2">
                    <div className="flex items-center gap-2 px-2 py-2 text-xs font-semibold uppercase text-gray-400">
                      <Layers size={15} />
                      Categories
                    </div>

                    {filteredCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryClick(category.id)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#023337] transition-colors hover:bg-gray-50"
                      >
                        <Layers size={17} className="text-[#4EA674]" />
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Brands */}
                {filteredBrands.length > 0 && (
                  <div className="border-t border-gray-100 p-2">
                    <div className="flex items-center gap-2 px-2 py-2 text-xs font-semibold uppercase text-gray-400">
                      <Tag size={15} />
                      Brands
                    </div>

                    {filteredBrands.map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => handleBrandClick(brand.id)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#023337] transition-colors hover:bg-gray-50"
                      >
                        <Tag size={17} className="text-[#4EA674]" />
                        {brand.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Barcha mahsulotlar */}
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full border-t border-gray-100 px-4 py-3 text-center text-sm font-medium text-[#4EA674] hover:bg-gray-50"
                >
                  Barcha mahsulotlarni ko'rish
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
