import ProductsDetials from "../(productsDetials)/page";
import Products from "../page";

type Props = {
  params: Promise<{
    id: string;
    name?: string;
  }>;
};
export default async function ProductsPage({ params }: Props) {
  const { id, name } = await params;

  if (name) {
    return <Products categoryId={id} />;
  }

  return <ProductsDetials productId={id} />;
}
