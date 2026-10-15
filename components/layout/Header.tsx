import HeaderClient from "./HeaderClient";

export const revalidate = 60;

interface Category {
  id: string;
  name: string;
  image?: string;
}

interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) throw new Error("Kategoriyalarni olishda xatolik");

  const result = await response.json();
  return result.data ?? [];
}

async function getBanners(): Promise<Banner[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/banners`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) throw new Error("Bannerlarni olishda xatolik");

  const result = await response.json();
  return result.data ?? [];
}

export default async function Header() {
  const [categories, banners] = await Promise.all([
    getCategories(),
    getBanners(),
  ]);

  return (
    <HeaderClient
      categoriesData={categories}
      bannerData={banners}
    />
  );
}