"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useOrderCreate } from "../hook/useOrderCreate";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemsCount: number;
  subtotal: number;
}

export default function OrderModal({
  isOpen,
  onClose,
  itemsCount,
  subtotal,
}: OrderModalProps) {
  const { mutate, isPending } = useOrderCreate();
  console.log(mutate);

  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US").format(price);

  const handleSubmit = () => {
    if (!address.trim()) {
      alert("Iltimos, yetkazib berish manzilini kiriting.");
      return;
    }

    // Request body formatini backend schema bo'yicha moslashtiring.
    mutate(
      { address: address.trim(), notes: notes.trim() },
      {
        onSuccess: () => {
          setAddress("");
          setNotes("");
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[500px] rounded-[24px] bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[24px] font-semibold text-[#023337]">
              Checkout
            </h2>
            <p className="mt-1 text-[14px] text-gray-500">
              Complete your order
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-100 hover:text-[#023337]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 rounded-[16px] bg-[#f8faf9] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-gray-500">
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </span>
            <span className="text-[18px] font-bold text-[#023337]">
              {formatPrice(subtotal)} UZS
            </span>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-[14px] font-semibold text-[#023337]">
            Delivery address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address..."
            rows={3}
            className="mt-2 w-full resize-none rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-[#023337] outline-none placeholder:text-gray-400 focus:border-[#4EA674] focus:ring-2 focus:ring-[#4EA674]/10"
          />
        </div>

        <div className="mt-5">
          <label className="text-[14px] font-semibold text-[#023337]">
            Order notes{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes..."
            rows={2}
            className="mt-2 w-full resize-none rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-[#023337] outline-none placeholder:text-gray-400 focus:border-[#4EA674] focus:ring-2 focus:ring-[#4EA674]/10"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#023337] px-5 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#03484d] hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Processing..." : "Confirm Order"}
          {!isPending && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
