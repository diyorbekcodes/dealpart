import Products from "../../page";

type Props = {
  params: Promise<{
    id: string;
    name: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { id, name } = await params;

  return (
    <div>
      
      <Products categoryId={id} />
    </div>
  );
}