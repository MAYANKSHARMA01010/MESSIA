"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  Heart,
  Award,
  Truck,
  Gift
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

/* -------------------------
   SIMPLE INLINE UI (NO SHADCN)
--------------------------*/

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl border shadow-sm hover:shadow-xl transition ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-8 ${className}`}>{children}</div>;
};

const Button = ({
  children,
  variant = "default",
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition focus:outline-none";
  const styles = {
    default:
      "bg-pink-600 text-white hover:bg-pink-700 px-8 py-3",
    outline:
      "border border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3",
    light:
      "bg-white text-pink-600 hover:bg-gray-100 px-8 py-3",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

/* -------------------------
   ABOUT PAGE
--------------------------*/

export default function About() {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-pink-600" />,
      title: "Eco-Friendly",
      description:
        "Sustainable materials & recyclable packaging to protect our planet while spreading joy.",
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Crafted with Love",
      description:
        "Every Messia gift is assembled by hand with attention to detail and heartfelt care.",
    },
    {
      icon: <Award className="h-8 w-8 text-pink-600" />,
      title: "Premium Quality",
      description:
        "We source only high-quality products that deliver both beauty and reliability.",
    },
    {
      icon: <Truck className="h-8 w-8 text-pink-600" />,
      title: "Fast Delivery",
      description:
        "Pan-India delivery with careful packaging & trusted shipping partners.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Started Messia to transform everyday gifting into magical experiences.",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "Designs unique gift combinations that delight customers nationwide.",
    },
    {
      name: "Emma Rodriguez",
      role: "Quality Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Ensures every product meets our highest quality standards.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Choose Products",
      description:
        "We hand-pick premium gift items trusted by thousands of customers.",
    },
    {
      step: "02",
      title: "Customize Box",
      description:
        "Each box is curated according to celebrations, themes & personal tastes.",
    },
    {
      step: "03",
      title: "Hand Pack",
      description:
        "Artisan team carefully packs items to ensure safety & presentation.",
    },
    {
      step: "04",
      title: "Deliver Happiness",
      description:
        "Fast shipping ensures your loved ones receive joy on time.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-20">

        {/* HERO */}
        <section className="bg-gradient-to-br from-pink-50 to-red-100 py-20 text-center">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Our Story
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MESSIA was born from the belief that every occasion deserves to be
            celebrated beautifully — turning emotions into lasting memories.
          </p>
        </section>

        {/* MISSION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                Our Mission
              </h2>

              <p className="text-gray-600 mb-6">
                Our mission is to make gifting simple, heartfelt, and effortless.
                From birthdays to anniversaries, Messia curates premium experiences
                your loved ones will never forget.
              </p>

              <p className="text-gray-600 mb-8">
                Through quality products, elegant packaging, and on-time delivery,
                we help you create meaningful moments with ease.
              </p>

              <Link href="/products">
                <Button>Explore Our Gifts</Button>
              </Link>
            </div>

            <div className="flex justify-center">
              <Image
                src="/HomeSectionBgImg.jpg"
                alt="Crafting Gifts"
                width={450}
                height={450}
                className="rounded-2xl shadow-2xl object-cover"
              />
            </div>

          </div>
        </section>

        {/* VALUES */}
        <section className="py-16 bg-pink-50">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-3xl font-serif font-bold">
              Our Values
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
              {values.map((v, i) => (
                <Card key={i}>
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      {v.icon}
                    </div>
                    <h3 className="font-semibold mb-3">{v.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {v.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </section>

        {/* TEAM */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-3xl font-serif font-bold text-center mb-16">
              Meet Our Team
            </h2>

            <div className="grid sm:grid-cols-3 gap-8">
              {team.map((m, i) => (
                <Card key={i} className="text-center">
                  <CardContent>
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-md"
                    />

                    <h3 className="font-semibold text-lg">
                      {m.name}
                    </h3>

                    <p className="text-pink-600 mb-4">
                      {m.role}
                    </p>

                    <p className="text-gray-600 text-sm">
                      {m.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </section>

        {/* PROCESS */}
        <section className="py-16 bg-pink-50">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-3xl font-serif font-bold mb-14">
              How We Create Magic
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {process.map((step, i) => (
                <div key={i}>
                  <div className="w-16 h-16 mx-auto bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6">
                    {step.step}
                  </div>

                  <h3 className="font-semibold mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-pink-600 to-red-500 text-white text-center">

          <Gift size={44} className="mx-auto mb-4" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready To Gift Happiness?
          </h2>

          <p className="max-w-xl mx-auto text-white/90 mb-8">
            Discover premium curated gift boxes and surprise your loved ones today.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/products">
              <Button variant="light">Shop Gifts</Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}
