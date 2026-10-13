import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://dealpartuz-alpha.vercel.app"),

  title: {
    default: "Bizda",
    template: "%s | Bizda",
  },

  description: "Bizda — qurilish uchun kerakli mahsulotlar onlayn do‘koni.",

  openGraph: {
    type: "website",
    siteName: "Bizda",
    title: "Bizda — Qurilish uchun hammasi!",
    description: "Qurilish uchun kerakli mahsulotlarni Bizda bilan toping.",
    url: "https://dealpartuz-alpha.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bizda — Qurilish uchun hammasi!",
      },
    ],
    locale: "uz_UZ",
  },
};

export default function page() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
