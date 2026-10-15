import ProductsDetials from "../(productsDetials)/page";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return <ProductsDetials productId={id} />;
}