import ProductsDetials from "../(productsDetials)/page";
import type { Product } from "../types/ProductsType";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 300;

async function getProduct(id: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  const response = await fetch(`${baseUrl}/products/${id}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  const result = await response.json();
  return result.data ?? null;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const initialProduct = await getProduct(id);

  return <ProductsDetials productId={id} initialProduct={initialProduct} />;
}