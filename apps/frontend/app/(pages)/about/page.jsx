"use client";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Award, Truck, Gift } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-[var(--surface)] rounded-xl border shadow-sm hover:shadow-xl transition ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-8 ${className}`}>{children}</div>
);

const Button = ({ children, variant = "default", className = "" }) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition focus:outline-none";
  const styles = {
    default:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] px-8 py-3",
    outline:
      "border border-white text-white hover:bg-white hover:text-[var(--primary)] px-8 py-3",
    light: "bg-white text-[var(--primary)] hover:bg-gray-100 px-8 py-3",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default function About() {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-[var(--primary)]" />,
      title: "Eco-Friendly",
      description:
        "Sustainable materials & recyclable packaging to protect our planet while spreading joy.",
    },
    {
      icon: <Heart className="h-8 w-8 text-[var(--primary)]" />,
      title: "Crafted with Love",
      description:
        "Every Messia gift is assembled by hand with attention to detail and heartfelt care.",
    },
    {
      icon: <Award className="h-8 w-8 text-[var(--primary)]" />,
      title: "Premium Quality",
      description:
        "We source only high-quality products that deliver both beauty and reliability.",
    },
    {
      icon: <Truck className="h-8 w-8 text-[var(--primary)]" />,
      title: "Fast Delivery",
      description:
        "Pan-India delivery with careful packaging & trusted shipping partners.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder",
      image: "https://i.pravatar.cc/300?img=1",
      bio: "Started Messia to transform everyday gifting into magical experiences.",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image: "https://i.pravatar.cc/300?img=2",
      bio: "Designs unique gift combinations that delight customers nationwide.",
    },
    {
      name: "Emma Rodriguez",
      role: "Quality Manager",
      image: "https://i.pravatar.cc/300?img=3",
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
      description: "Fast shipping ensures your loved ones receive joy on time.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[var(--background)] pt-20">
        <section className="bg-gradient-to-br from-[var(--surface-alt)] to-[var(--primary-light)]/10 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-[var(--foreground)] animate-fade-in relative z-10">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed animate-slide-up relative z-10">
            MESSIA was born from the belief that every occasion deserves to be
            celebrated beautifully — turning emotions into lasting memories.
          </p>
        </section>

        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-serif font-bold mb-6 text-[var(--foreground)]">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                Our mission is to make gifting simple, heartfelt, and
                effortless. From birthdays to anniversaries, Messia curates
                premium experiences your loved ones will never forget.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg leading-relaxed">
                Through quality products, elegant packaging, and on-time
                delivery, we help you create meaningful moments with ease.
              </p>
              <Link href="/products">
                <Button className="shadow-lg hover:shadow-glow">
                  Explore Our Gifts
                </Button>
              </Link>
            </div>
            <div className="flex justify-center animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--primary)] blur-2xl opacity-20 rounded-full"></div>
                <Image
                  src="/HomeSectionBgImg.jpg"
                  alt="Crafting Gifts"
                  width={450}
                  height={450}
                  className="rounded-3xl shadow-2xl object-cover relative z-10 border-4 border-[var(--surface)]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[var(--surface-alt)]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif font-bold text-[var(--foreground)] mb-12">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <Card
                  key={i}
                  className="glass-panel border-none hover:-translate-y-2 transition-transform duration-300"
                >
                  <CardContent>
                    <div className="flex justify-center mb-6 p-4 bg-[var(--surface)] rounded-full w-fit mx-auto shadow-sm">
                      {v.icon}
                    </div>
                    <h3 className="font-serif font-bold text-xl mb-3 text-[var(--foreground)]">
                      {v.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-serif font-bold text-center mb-16 text-[var(--foreground)]">
              Meet Our Team
            </h2>
            <div className="grid sm:grid-cols-3 gap-10">
              {team.map((m, i) => (
                <Card
                  key={i}
                  className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-0 pb-8">
                    <div className="relative overflow-hidden mb-6">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <p className="text-white font-medium">
                          Connect on LinkedIn
                        </p>
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[var(--foreground)]">
                      {m.name}
                    </h3>
                    <p className="text-[var(--primary)] font-medium mb-3 uppercase tracking-wide text-sm">
                      {m.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm px-6">
                      {m.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[var(--surface-alt)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-16 text-[var(--foreground)]">
              How We Create Magic
            </h2>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="absolute top-8 left-0 w-full h-0.5 bg-[var(--border)] hidden md:block -z-10"></div>
              {process.map((step, i) => (
                <div
                  key={i}
                  className="bg-[var(--surface)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 mx-auto bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-serif font-bold text-2xl mb-6 shadow-lg ring-4 ring-[var(--surface)]">
                    {step.step}
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3 text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <Gift size={56} className="mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready To Gift Happiness?
            </h2>
            <p className="max-w-xl mx-auto text-white/90 mb-10 text-lg font-light">
              Discover premium curated gift boxes and surprise your loved ones
              today.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/products">
                <Button
                  variant="light"
                  className="shadow-xl hover:scale-105 transition-transform"
                >
                  Shop Gifts
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[var(--primary)]"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
