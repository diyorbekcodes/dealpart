import { getProducts } from "@/app/(shop)/products/page";
import { CarouselProvider } from "@/context/CarouselContext";
import MainContent from "./MainContext";
export default async function Main() {
  const product = await getProducts();

  return (
    <CarouselProvider>
      <MainContent product={product} />
    </CarouselProvider>
  );
}