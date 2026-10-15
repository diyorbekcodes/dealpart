import { getProducts } from "../../page";
import Products from "../../Products";

export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string;
    name: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = await getProducts();

  return <Products categoryId={id} products={products} />;
}
