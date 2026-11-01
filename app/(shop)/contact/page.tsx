
"use client"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  ArrowRight,
} from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone Number',
    value: '+998 90 123 45 67',
    subtitle: 'Mon - Sat, 9:00 AM - 6:00 PM',
  },
  {
    icon: Mail,
    title: 'Email Address',
    value: 'support@onlineshop.com',
    subtitle: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Our Location',
    value: 'Tashkent, Uzbekistan',
    subtitle: 'Visit our office',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: '09:00 AM - 06:00 PM',
    subtitle: 'Monday - Saturday',
  },
]

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! Your message has been submitted.')
  }

  return (
    <main className="bg-white text-[#023337]">

      {/* Hero Section */}
      <section className="bg-[#F3F8F5] px-5 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block rounded-full bg-[#4EA674]/10 px-5 py-2 text-sm font-semibold text-[#4EA674]">
            Get In Touch
          </span>

          <h1 className="mt-5 text-4xl font-bold md:text-6xl">
            We'd Love To
            <span className="text-[#4EA674]"> Hear From You</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
            Have a question, suggestion, or need assistance?
            Our team is always ready to help you.
            Contact us and let's make your shopping experience better.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#contact-form"
              className="flex items-center gap-2 rounded-xl bg-[#4EA674] px-7 py-4 font-semibold text-white transition hover:bg-[#3d9160]"
            >
              Contact Us
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-[#4EA674]">
            Contact Information
          </span>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Let's Connect Together
          </h2>

          <p className="mt-4 text-gray-500">
            Here are the different ways you can reach us.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-7 transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4EA674]/10 text-[#4EA674]">
                  <Icon size={26} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 break-words font-semibold">
                  {item.value}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact-form"
        className="bg-[#F8FAF9] px-5 py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#4EA674]">
              Send Us A Message
            </span>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              We're Here To
              <span className="text-[#4EA674]"> Help You</span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-gray-600">
              Whether you have questions about products, orders,
              payments, or delivery, feel free to send us a message.
              We will get back to you as soon as possible.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4EA674]/10 text-[#4EA674]">
                <Headphones size={28} />
              </div>

              <div>
                <h3 className="font-bold">Customer Support</h3>
                <p className="mt-1 text-sm text-gray-500">
                  We're always ready to assist you.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4EA674]/10 text-[#4EA674]">
                <MessageCircle size={28} />
              </div>

              <div>
                <h3 className="font-bold">Quick Response</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your questions matter to us.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-10">
            <h3 className="text-2xl font-bold">
              Send a Message
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Fill out the form below and we'll contact you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4EA674] focus:ring-2 focus:ring-[#4EA674]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4EA674] focus:ring-2 focus:ring-[#4EA674]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4EA674] focus:ring-2 focus:ring-[#4EA674]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Your Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4EA674] focus:ring-2 focus:ring-[#4EA674]/10"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#4EA674] py-4 font-semibold text-white transition hover:bg-[#3d9160]"
              >
                Send Message
                <Send size={19} />
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-[#4EA674]">
            Find Us
          </span>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Visit Our Location
          </h2>
        </div>

        <div className="flex h-[350px] flex-col items-center justify-center rounded-3xl bg-[#F3F8F5] text-center">
          <MapPin size={45} className="text-[#4EA674]" />

          <h3 className="mt-4 text-xl font-bold">
            Tashkent, Uzbekistan
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Our online store is always available for you.
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Tashkent+Uzbekistan"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 rounded-xl bg-[#4EA674] px-6 py-3 font-semibold text-white transition hover:bg-[#3d9160]"
          >
            Open Google Maps
          </a>
        </div>
      </section>

    </main>
  )
}
