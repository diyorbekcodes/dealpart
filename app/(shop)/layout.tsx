import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://dealpartuz-alpha.vercel.app"),

  title: {
    default: "Dealpart",
    template: "%s | Dealpart",
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
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-y-auto scrollbar-hide pt-[160px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
