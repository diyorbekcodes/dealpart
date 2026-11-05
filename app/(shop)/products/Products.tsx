import CardProduct from "@/components/ui/CardProduct";
import { Product } from "./types/ProductsType";
import SortProducts from "@/components/ui/SortBy";

interface Props {
  categoryId: string;
  products: Product[];
}

export default function Products({ categoryId, products }: Props) {
  const filteredProducts = [...products].filter((product) => {
    const matchesCategory =
      !categoryId ||
      categoryId === "all" ||
      product.category?.id === categoryId;

    return matchesCategory;
  });

  const categoryName =
    products.find((product) => product.category?.id === categoryId)?.category
      ?.name || "All products";

  return (
    <section className="px-[20px] py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold">{categoryName}</h1>

          <p className="text-[14px] text-[#64748B]">
            {filteredProducts.length} ta mahsulot sotuvda bor
          </p>
        </div>

        <div>
          <SortProducts />
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredProducts.map((product: Product) => {
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
    </section>
  );
}
