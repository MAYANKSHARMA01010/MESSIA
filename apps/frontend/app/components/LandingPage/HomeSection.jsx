/* eslint-disable react-hooks/immutability */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1920&q=80",
    title: "Welcome to MESSIA",
    subtitle: "Your magical destination for personalized and thoughtful gifts.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1920&q=80",
    title: "Curate Your Perfect Box",
    subtitle:
      "MESSIA crafts gift experiences that match your style and budget.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1920&q=80",
    title: "Bloom with Love",
    subtitle:
      "Send beautiful floral gifts that speak the language of emotion with MESSIA.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1920&q=80",
    title: "Make Every Occasion Special",
    subtitle: "From birthdays to anniversaries, let MESSIA handle the magic.",
  },
];
export default function HomeSection({ ctaOnClick = () => {} }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            priority={index === current}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />
        </div>
      ))}
      {}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16 sm:py-24 lg:py-32">
        <div className="max-w-xl text-center md:text-left transition-all duration-700 ease-in-out">
          <h1
            key={slides[current].id}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[var(--primary-dark)] leading-tight animate-fade-in drop-shadow-sm"
          >
            {slides[current].title}
          </h1>
          <p className="mt-6 text-[var(--foreground)] text-lg sm:text-xl md:text-2xl max-w-md md:max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
            {slides[current].subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            {}
            <button
              onClick={ctaOnClick}
              className="btn-primary px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Get Started
            </button>
            {}
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-3 rounded-full glass hover:bg-[var(--surface)]/80 border border-[var(--border-glass)] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <ChevronLeft className="w-5 h-5 text-[var(--primary)] group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-3 rounded-full glass hover:bg-[var(--surface)]/80 border border-[var(--border-glass)] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <ChevronRight className="w-5 h-5 text-[var(--primary)] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === current
                ? "bg-[var(--primary)] w-8"
                : "bg-gray-300/70 dark:bg-gray-600/70 w-2 hover:bg-[var(--primary-light)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
