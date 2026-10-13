import BrandDetials from "../(brandDetials)/page";
import Brand from "../page";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BrandPage({ params }: Props) {
  const { id } = await params;

  if (id) {
    return <BrandDetials brandId={id} />;
  }

  return <Brand />;
}