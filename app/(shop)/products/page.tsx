import Products from "./Products";

export const revalidate = 60;

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    page?: string;
    limit?: string;
  }>;
}

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Products yuklanmadi");
  }

  const result = await response.json();
  return result.data ?? [];
}

export default async function ProductsPage({ searchParams }: Props) {
  const [products, params] = await Promise.all([
    getProducts(),
    searchParams,
  ]);

  return (
    <Products
      products={products}
      brand={params.brand ?? ""}
      category={params.category ?? ""}
      search={params.search ?? ""}
    />
  );
}