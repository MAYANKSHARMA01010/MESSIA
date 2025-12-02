"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Instagram,
  Truck,
  ShieldCheck,
  Gift,
  Sparkles,
} from "lucide-react";
import HomeSection from "./components/LandingPage/HomeSection";

const categories = [
  {
    id: 1,
    name: "Curated Gift Boxes",
    description: "Hand-picked luxury for every emotion.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    size: "large", // col-span-2 row-span-2
    link: "/products?category=gift-boxes",
  },
  {
    id: 2,
    name: "Fresh Blooms",
    description: "Speak the language of flowers.",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80",
    size: "medium", // col-span-1 row-span-1
    link: "/products?category=flowers",
  },
  {
    id: 3,
    name: "Personalized",
    description: "Gifts with a personal touch.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    size: "medium", // col-span-1 row-span-1
    link: "/products?category=personalized",
  },
  {
    id: 4,
    name: "Anniversary Specials",
    description: "Celebrate love in style.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    size: "wide", // col-span-2 row-span-1
    link: "/products?category=anniversary",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "The Royal Hamper",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=600&q=80",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Velvet Roses Box",
    price: "₹1,299",
    image:
      "https://images.unsplash.com/photo-1602615576820-ea14cf3e476a?auto=format&fit=crop&w=600&q=80",
    tag: "New",
  },
  {
    id: 3,
    name: "Golden Delight Set",
    price: "₹3,999",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    tag: null,
  },
  {
    id: 4,
    name: "Midnight Surprise",
    price: "₹1,899",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    tag: "Trending",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Aisha Verma",
    text: "The packaging was absolutely stunning! My sister loved her birthday gift. Messia truly delivers happiness.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohan Mehta",
    text: "Ordered a last-minute anniversary gift and it arrived right on time. The quality is unmatched.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sneha Kapoor",
    text: "Beautifully curated boxes. I love how personal everything feels. Highly recommended!",
    rating: 5,
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <main className="bg-[var(--background)] overflow-x-hidden">
        <HomeSection ctaOnClick={() => router.push("/products")} />

        {/* Curated Categories - Bento Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-[var(--primary)] font-medium tracking-wider uppercase text-sm">
              Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)] mt-3">
              Curated with Love
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                onClick={() => router.push(cat.link)}
                className={`relative group overflow-hidden rounded-3xl cursor-pointer animate-slide-up ${cat.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : cat.size === "wide"
                    ? "md:col-span-2"
                    : ""
                  }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 mt-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <span className="text-[var(--primary)] font-medium tracking-wider uppercase text-sm">
                  Trending
                </span>
                <h2 className="text-4xl font-serif font-bold text-[var(--foreground)] mt-3">
                  Featured Gifts
                </h2>
              </div>
              <button
                onClick={() => router.push("/products")}
                className="group flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium"
              >
                View All{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="group cursor-pointer animate-scale-in"
                  onClick={() => router.push("/products")}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--surface-alt)] mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.tag && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-black shadow-sm">
                        {product.tag}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-black px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--primary)] hover:text-white shadow-lg">
                        Quick View
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[var(--primary)] font-bold mt-1">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="p-8 rounded-3xl bg-[var(--surface-alt)] border border-[var(--border)] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)] mb-6">
                  <Truck size={32} />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Express Delivery
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  24-48 hour delivery across major cities. Happiness shouldn't
                  wait.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-[var(--surface-alt)] border border-[var(--border)] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)] mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Premium Quality
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Hand-picked products from the finest artisans. Quality you can
                  trust.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-[var(--surface-alt)] border border-[var(--border)] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)] mb-6">
                  <Gift size={32} />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Beautiful Packaging
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Every order is gift-wrapped with our signature premium
                  packaging.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-[var(--primary)] font-medium tracking-wider uppercase text-sm">
              Love Notes
            </span>
            <h2 className="text-4xl font-serif font-bold text-[var(--foreground)] mt-3 mb-16">
              What Our Customers Say
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-[var(--background)] p-8 rounded-3xl shadow-sm border border-[var(--border)] text-left relative hover:shadow-md transition-shadow"
                >
                  <div className="absolute -top-4 left-8 bg-[var(--primary)] text-white p-2 rounded-xl shadow-lg">
                    <Sparkles size={20} />
                  </div>
                  <div className="flex gap-1 text-yellow-400 mb-4 mt-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[var(--foreground)] text-lg leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                  <p className="font-bold text-[var(--primary)] font-serif">
                    - {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-[var(--primary-dark)] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Join the Inner Circle
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                Subscribe to our newsletter for exclusive offers, new arrivals,
                and gifting inspiration.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 backdrop-blur-sm transition-all"
                />
                <button className="bg-white text-[var(--primary-dark)] px-8 py-4 rounded-full font-bold hover:bg-[var(--primary-light)] transition-colors shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Feed Mock */}
        <section className="py-12 border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Instagram size={24} className="text-[var(--primary)]" />
                <span className="font-bold text-xl text-[var(--foreground)]">
                  @messia.official
                </span>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-[var(--primary)] transition-colors"
              >
                Follow us
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&w=400&q=80"
              ].map((src, i) => (
                <div
                  key={i}
                  className="aspect-square relative overflow-hidden rounded-xl bg-[var(--surface-alt)] group cursor-pointer"
                >
                  <Image
                    src={src}
                    alt="Instagram"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
