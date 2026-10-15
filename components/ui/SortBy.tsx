"use client";

import { Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortProducts() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort") || "all";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Select
      value={sortBy}
      onChange={handleSortChange}
      className="w-[220px]"
      options={[
        { value: "all", label: "All products" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "rating", label: "Rating: High to Low" },
      ]}
    />
  );
}