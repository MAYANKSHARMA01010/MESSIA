import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-[var(--surface-alt)] text-[var(--foreground)] relative overflow-hidden border-t border-[var(--border)] transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 text-center sm:text-left">
            <h4 className="text-3xl font-serif font-bold mb-6 text-[var(--foreground)]">
              Messia<span className="text-[var(--primary)]">.</span>
            </h4>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto sm:mx-0 mb-8 leading-relaxed">
              Creating moments of tranquility through premium handcrafted
              candles. Made with love, care, and the finest natural ingredients.
            </p>
            <div className="flex justify-center sm:justify-start gap-6 text-gray-500 dark:text-gray-400">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[var(--primary)] transition-colors transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[var(--primary)] transition-colors transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="hover:text-[var(--primary)] transition-colors transform hover:scale-110"
              >
                <FaPinterest size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-[var(--primary)] transition-colors transform hover:scale-110"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h5 className="text-lg font-semibold mb-6 text-[var(--foreground)]">
              Quick Links
            </h5>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/products">Products</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/faqs">FAQ</FooterLink>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h5 className="text-lg font-semibold mb-6 text-[var(--foreground)]">
              Customer Service
            </h5>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/faqs">Shipping Info</FooterLink>
              <FooterLink href="/faqs">Returns</FooterLink>
              <FooterLink href="/faqs">Size Guide</FooterLink>
              <FooterLink href="/faqs">Care Instructions</FooterLink>
              <FooterLink href="/faqs">Wholesale</FooterLink>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--border)] mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Messia. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center sm:justify-end">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-600 dark:text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer"
      >
        {children}
      </Link>
    </li>
  );
}
