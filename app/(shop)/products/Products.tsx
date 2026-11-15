
import CardProduct from "@/components/ui/CardProduct";
import { Product } from "./types/ProductsType";

interface Props {
  products: Product[];
  brand?: string;
  category?: string;
  search?: string;
}

export default function Products({
  products,
  brand = "",
  category = "",
  search = "",
}: Props) {
  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      !brand ||
      product.brand?.slug === brand;

    const matchesCategory =
      !category ||
      product.category?.slug === category;

    const matchesSearch = String(product.name ?? "")
      .toLowerCase()
      .startsWith(search.trim().toLowerCase());

    return matchesBrand && matchesCategory && matchesSearch;
  });

  const brandName = products.find(
    (product) => product.brand?.slug === brand
  )?.brand?.name;

  const categoryName = products.find(
    (product) => product.category?.slug === category
  )?.category?.name;

  return (
    <section className="px-[20px] py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold">
            {brandName || categoryName || "All products"}
          </h1>

          <p className="text-[14px] text-[#64748B]">
            {filteredProducts.length} ta mahsulot sotuvda bor
          </p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-lg font-semibold text-[#023337]">
            Mahsulot topilmadi
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Boshqa mahsulot nomini qidirib ko‘ring.
          </p>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => {
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
      )}
    </section>
  );
}
