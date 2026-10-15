import Products from "./Products";

export const revalidate = 60;

export async function getProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Products yuklanmadi");
  }

  const result = await response.json();

  return result.data ?? [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <Products categoryId="all" products={products} />;
}
