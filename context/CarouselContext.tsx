"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

interface CarouselContextType {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  scrollLeft: () => void;
  scrollRight: () => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export function CarouselProvider({ children }: { children: ReactNode }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <CarouselContext.Provider value={{ carouselRef, scrollLeft, scrollRight }}>
      {children}
    </CarouselContext.Provider>
  );
}

export function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be inside CarouselProvider");
  }

  return context;
}
