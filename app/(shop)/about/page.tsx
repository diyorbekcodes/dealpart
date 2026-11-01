import Image from "next/image";
import aboutfor from "../../../assets/img/aboutfor.png";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  Heart,
  Target,
  Users,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We deliver your favorite products quickly and safely to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Your privacy and payment security are always our top priorities.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our friendly support team is always ready to help you.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We focus on your satisfaction and make shopping simple and enjoyable.",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make online shopping easy, accessible, and enjoyable by providing quality products at competitive prices.",
  },
  {
    icon: Users,
    title: "Our Vision",
    description:
      "To become a trusted shopping destination where every customer feels valued and confident.",
  },
  {
    icon: Award,
    title: "Our Values",
    description:
      "Quality, honesty, innovation, and customer satisfaction are at the heart of everything we do.",
  },
];

export default function About() {
  return (
    <main className="bg-white text-[#023337]">
      {/* Hero */}
      <section className="bg-[#F3F8F5] px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="mb-5 inline-block rounded-full bg-[#4EA674]/10 px-4 py-2 text-sm font-semibold text-[#4EA674]">
              About Our Store
            </span>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Shopping Made
              <span className="text-[#4EA674]"> Simple </span>& Enjoyable
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 md:text-lg">
              We believe shopping should be simple, convenient, and enjoyable.
              Our goal is to bring you quality products, great prices, and an
              excellent shopping experience.
            </p>

            <a
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#4EA674] px-7 py-4 font-semibold text-white transition hover:bg-[#3d9160]"
            >
              <ShoppingBag size={20} />
              Explore Products
            </a>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-[600px] h-[450px] mx-auto">
              <Image
                src={aboutfor}
                alt="About Our Online Shop"
                fill
                priority
                sizes="600px"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-5 shadow-lg md:-left-6">
              <p className="text-2xl font-bold text-[#4EA674]">Your Choice</p>
              <p className="mt-1 text-sm text-gray-500">Our Priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-[#4EA674]">
            Who We Are
          </span>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            More Than Just an Online Store
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            We are an online shopping platform designed to make your everyday
            shopping easier. From discovering new products to receiving your
            orders, we aim to make every step smooth and convenient. We
            carefully focus on product quality, customer experience, and
            reliable service.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F8FAF9] px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#4EA674]">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              We Make Shopping Better
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 bg-white p-7 transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#4EA674]/10 text-[#4EA674]">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-[#4EA674]">
            What Drives Us
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Our Mission & Values
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="rounded-2xl bg-[#F3F8F5] p-8">
                <Icon size={34} className="text-[#4EA674]" />

                <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#023337] px-7 py-16 text-center text-white md:px-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Shopping?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-300">
            Discover products you love and enjoy a better online shopping
            experience with us.
          </p>

          <a
            href="/products"
            className="mt-8 inline-flex items-center rounded-xl bg-[#4EA674] px-8 py-4 font-semibold text-white transition hover:bg-[#3d9160]"
          >
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
}
