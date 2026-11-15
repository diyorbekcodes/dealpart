
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  MapPin,
} from "lucide-react";
import { Spin } from "antd";

import { useCart } from "../hook/useCart";
import { useOrderCreate } from "../hook/useOrderCreate";
import type { AddressForm } from "../types/addCartType";

const regionsData: Record<string, string[]> = {
  "Toshkent shahri": [
    "Bektemir tumani",
    "Chilonzor tumani",
    "Mirobod tumani",
    "Mirzo Ulug‘bek tumani",
    "Olmazor tumani",
    "Sergeli tumani",
    "Shayxontohur tumani",
    "Uchtepa tumani",
    "Yakkasaroy tumani",
    "Yashnobod tumani",
    "Yunusobod tumani",
    "Yangihayot tumani",
  ],
  "Toshkent viloyati": [
    "Nurafshon shahri",
    "Angren shahri",
    "Bekobod shahri",
    "Chirchiq shahri",
    "Olmaliq shahri",
    "Ohangaron shahri",
    "Yangiyo‘l shahri",
    "Bo‘ka tumani",
    "Chinoz tumani",
    "Oqqo‘rg‘on tumani",
    "Parkent tumani",
    "Piskent tumani",
    "Zangiota tumani",
    "Qibray tumani",
  ],
  "Andijon viloyati": [
    "Andijon shahri",
    "Asaka tumani",
    "Xonobod shahri",
    "Shahrixon tumani",
    "Qo‘rg‘ontepa tumani",
    "Marhamat tumani",
    "Paxtaobod tumani",
  ],
  "Samarqand viloyati": [
    "Samarqand shahri",
    "Kattaqo‘rg‘on shahri",
    "Urgut tumani",
    "Oqdaryo tumani",
    "Bulung‘ur tumani",
    "Ishtixon tumani",
    "Jomboy tumani",
    "Narpay tumani",
  ],
};

const initialAddress: AddressForm = {
  firstName: "",
  lastName: "",
  phone: "",
  region: "",
  city: "",
  district: "",
  mahalla: "",
  street: "",
  house: "",
  apartment: "",
  comment: "",
};

const fields: {
  name: keyof AddressForm;
  label: string;
  placeholder: string;
  required?: boolean;
}[] = [
  {
    name: "firstName",
    label: "Ism",
    placeholder: "Ismingiz",
    required: true,
  },
  {
    name: "lastName",
    label: "Familiya",
    placeholder: "Familiyangiz",
    required: true,
  },
  {
    name: "phone",
    label: "Telefon raqam",
    placeholder: "+998901234567",
    required: true,
  },
  {
    name: "region",
    label: "Viloyat / Hudud",
    placeholder: "Viloyatni tanlang",
    required: true,
  },
  {
    name: "district",
    label: "Tuman / Shahar",
    placeholder: "Tumanni tanlang",
    required: true,
  },
  {
    name: "mahalla",
    label: "Mahalla",
    placeholder: "Mahalla nomi",
    required: true,
  },
  {
    name: "street",
    label: "Ko‘cha",
    placeholder: "Ko‘cha nomi",
    required: true,
  },
  {
    name: "house",
    label: "Uy raqami",
    placeholder: "12A",
    required: true,
  },
  {
    name: "apartment",
    label: "Xonadon",
    placeholder: "34",
  },
];

export default function OrderForm() {
  const router = useRouter();

  const { data, isLoading, isError } = useCart();
  const {
    mutate,
    isPending,
    isError: orderError,
    error,
  } = useOrderCreate();

  const cartData = data?.data;
  const cartItems = cartData?.items ?? [];

  const [address, setAddress] = useState<AddressForm>(initialAddress);
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  const districts = address.region
    ? regionsData[address.region] ?? []
    : [];

  const handleAddressChange = (
    name: keyof AddressForm,
    value: string
  ) => {
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const requiredFields: (keyof AddressForm)[] = [
      "firstName",
      "lastName",
      "phone",
      "region",
      "district",
      "mahalla",
      "street",
      "house",
    ];

    const emptyField = requiredFields.find(
      (field) => !address[field].trim()
    );

    if (emptyField) {
      setFormError("Iltimos, barcha majburiy maydonlarni to‘ldiring.");
      return;
    }

    if (cartItems.length === 0) {
      setFormError("Savatingiz bo‘sh. Avval mahsulot qo‘shing.");
      return;
    }

    mutate(
      {
        address: {
          firstName: address.firstName.trim(),
          lastName: address.lastName.trim(),
          phone: address.phone.trim(),
          region: address.region.trim(),
          city: address.city.trim(),
          district: address.district.trim(),
          mahalla: address.mahalla.trim(),
          street: address.street.trim(),
          house: address.house.trim(),
          apartment: address.apartment.trim(),
          comment: address.comment.trim(),
        },
        notes: notes.trim(),
      },
      {
        onSuccess: () => {
          router.push("/orders");
          router.refresh();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-red-500">
          Savat ma’lumotlarini yuklashda xatolik yuz berdi.
        </p>
        <Link
          href="/cart"
          className="mt-5 inline-flex items-center gap-2 text-[#4EA674]"
        >
          <ArrowLeft size={18} />
          Savatga qaytish
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <ShoppingBag
          size={48}
          className="mx-auto mb-4 text-gray-400"
        />
        <h2 className="text-2xl font-semibold text-[#023337]">
          Savatingiz bo‘sh
        </h2>
        <p className="mt-2 text-gray-500">
          Buyurtma berish uchun savatga mahsulot qo‘shing.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#4EA674] px-6 py-3 text-white"
        >
          Xaridni davom ettirish
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/cart"
        className="mb-7 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#4EA674]"
      >
        <ArrowLeft size={18} />
        Savatga qaytish
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#023337] md:text-3xl">
          Buyurtmani rasmiylashtirish
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Yetkazib berish ma’lumotlarini to‘ldiring.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {/* ADDRESS FORM */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4EA674]/10 text-[#4EA674]">
                <MapPin size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#023337]">
                  Yetkazib berish manzili
                </h2>
                <p className="text-sm text-gray-500">
                  Manzilingizni kiriting
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-[#023337]"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </label>

                  {field.name === "region" ? (
                    <select
                      id={field.name}
                      value={address.region}
                      required={field.required}
                      onChange={(e) => {
                        const region = e.target.value;

                        setAddress((prev) => ({
                          ...prev,
                          region,
                          city: "",
                          district: "",
                        }));
                      }}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#4EA674]"
                    >
                      <option value="">
                        Viloyatni tanlang
                      </option>

                      {Object.keys(regionsData).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  ) : field.name === "district" ? (
                    <select
                      id={field.name}
                      value={address.district}
                      required={field.required}
                      disabled={!address.region}
                      onChange={(e) => {
                        const district = e.target.value;

                        setAddress((prev) => ({
                          ...prev,
                          district,
                          city: district,
                        }));
                      }}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#4EA674] disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                      <option value="">
                        {address.region
                          ? "Tuman yoki shaharni tanlang"
                          : "Avval viloyatni tanlang"}
                      </option>

                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      type="text"
                      value={address[field.name]}
                      required={field.required}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        handleAddressChange(
                          field.name,
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#4EA674]"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ADDRESS COMMENT */}
            <div className="mt-5">
              <label
                htmlFor="comment"
                className="mb-2 block text-sm font-medium text-[#023337]"
              >
                Manzil bo‘yicha qo‘shimcha izoh
              </label>

              <textarea
                id="comment"
                rows={3}
                value={address.comment}
                onChange={(e) =>
                  handleAddressChange("comment", e.target.value)
                }
                placeholder="Mo‘ljal yoki qo‘shimcha ma’lumot..."
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#4EA674]"
              />
            </div>

            {/* ORDER NOTES */}
            <div className="mt-5">
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-[#023337]"
              >
                Buyurtma uchun izoh
              </label>

              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Buyurtmangiz haqida qo‘shimcha izoh..."
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#4EA674]"
              />
            </div>

            {formError && (
              <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {formError}
              </p>
            )}

            {orderError && (
              <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {(error as Error)?.message ||
                  "Buyurtma yuborishda xatolik yuz berdi."}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4EA674] px-6 py-4 font-semibold text-white transition hover:bg-[#3d8e60] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Spin size="small" />
                  Buyurtma yuborilmoqda...
                </>
              ) : (
                <>
                  Buyurtmani tasdiqlash
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <ShoppingBag size={21} className="text-[#4EA674]" />
            <h2 className="text-lg font-semibold text-[#023337]">
              Buyurtma xulosasi
            </h2>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4"
              >
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium text-[#023337]">
                    {item.product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.quantity} dona
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold text-[#023337]">
                  {Number(item.lineTotal).toLocaleString("uz-UZ")} so‘m
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Mahsulotlar soni</span>
              <span>{cartData?.itemsCount ?? 0} dona</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Yetkazib berish</span>
              <span>Kelishiladi</span>
            </div>

            <div className="flex justify-between border-t border-gray-100 pt-4">
              <span className="font-semibold text-[#023337]">
                Jami:
              </span>

              <span className="text-lg font-bold text-[#4EA674]">
                {Number(cartData?.subtotal ?? 0).toLocaleString("uz-UZ")} so‘m
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
