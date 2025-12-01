"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Gift,
  Heart,
  PartyPopper,
  Cake,
  Flower,
  CalendarHeart,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  Clock
} from "lucide-react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeSection from "./components/LandingPage/HomeSection";

const featuredProducts = [
  {
    id: 1,
    name: "Birthday Gift Box",
    price: "₹1499",
    image: "/HomeSectionBgImg.jpg"
  },
  {
    id: 2,
    name: "Anniversary Surprise",
    price: "₹1999",
    image: "/HomeSectionBgImg.jpg"
  },
  {
    id: 3,
    name: "Love Rose Combo",
    price: "₹999",
    image: "/HomeSectionBgImg.jpg"
  },
  {
    id: 4,
    name: "Personalized Mug Set",
    price: "₹799",
    image: "/HomeSectionBgImg.jpg"
  }
];

const occasions = [
  { icon: <Cake size={28} />, name: "Birthdays" },
  { icon: <CalendarHeart size={28} />, name: "Anniversaries" },
  { icon: <Flower size={28} />, name: "Valentine's" },
  { icon: <PartyPopper size={28} />, name: "Celebrations" },
];

const categories = [
  { icon: <Gift size={28} />, name: "Gift Boxes" },
  { icon: <Heart size={28} />, name: "For Loved Ones" },
  { icon: <Flower size={28} />, name: "Flowers" },
];

const features = [
  {
    icon: <Truck size={30} />,
    title: "Fast Delivery",
    desc: "Get gifts delivered within 24–48 hours across India."
  },
  {
    icon: <ShieldCheck size={30} />,
    title: "Premium Quality",
    desc: "Hand-picked products crafted with love."
  },
  {
    icon: <Clock size={30} />,
    title: "On-time Surprises",
    desc: "No missed celebrations, we deliver on your schedule."
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">

        <HomeSection ctaOnClick={() => router.push("/products")} />

        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title">Browse Categories</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => router.push("/products")}
                  className="category-card"
                >
                  {cat.icon}
                  <p>{cat.name}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title">Featured Gifts</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {featuredProducts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => router.push("/products")}
                  className="product-card"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  <p className="mt-3 font-medium text-gray-700">
                    {item.name}
                  </p>

                  <p className="text-pink-600 font-semibold">
                    {item.price}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={() => router.push("/products")}
                className="btn-primary flex items-center gap-2"
              >
                View All Products
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title">Shop by Occasion</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {occasions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push("/products")}
                  className="occasion-card"
                >
                  {item.icon}
                  <p>{item.name}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="section-title">Why Choose Messia?</h2>

            <div className="grid sm:grid-cols-3 gap-10 mt-10">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="text-pink-600 mb-3 flex justify-center">
                    {f.icon}
                  </div>

                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/about")}
              className="mt-10 btn-outline"
            >
              Learn More About Us
            </button>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="section-title">Need Help?</h2>

            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Our support team is always ready to assist you with your gifting needs.
            </p>

            <div className="flex justify-center gap-10 mt-8">
              <InfoItem icon={<Mail size={28} />} text="support@messia.in" />
              <InfoItem icon={<Phone size={28} />} text="+91 99999 12345" />
              <InfoItem icon={<MapPin size={28} />} text="New Delhi, India" />
            </div>

            <button
              onClick={() => router.push("/contact")}
              className="mt-10 btn-primary"
            >
              Contact Us
            </button>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-pink-600 to-red-500 text-white text-center">
          <h2 className="text-4xl font-bold">
            Make Someone Smile Today ❤️
          </h2>

          <p className="mt-3 text-white/90 max-w-xl mx-auto">
            Curate magical moments for your loved ones with MESSIA’s premium gifting experience.
          </p>

          <button
            onClick={() => router.push("/products")}
            className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition"
          >
            Start Shopping
          </button>
        </section>

      </main>

      <Footer />
    </>
  );
}

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-700">
    {icon}
    <span>{text}</span>
  </div>
);
