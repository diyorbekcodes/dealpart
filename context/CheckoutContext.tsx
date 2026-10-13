"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CheckoutContextType {
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (value: boolean) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <CheckoutContext.Provider value={{ isCheckoutOpen, setIsCheckoutOpen }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout CheckoutProvider ichida ishlatilishi kerak");
  }

  return context;
}
