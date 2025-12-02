import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="bg-purple-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    <div className="md:col-span-2 text-center sm:text-left">
                        <h4 className="text-2xl font-serif font-bold mb-4">Essia</h4>
                        <p className="text-sm text-white/80 max-w-md mx-auto sm:mx-0 mb-6">
                            Creating moments of tranquility through premium handcrafted
                            candles. Made with love, care, and the finest natural ingredients.
                        </p>
                        <div className="flex justify-center sm:justify-start gap-5 text-white/60">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="hover:text-white transition"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="hover:text-white transition"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="Pinterest"
                                className="hover:text-white transition"
                            >
                                <FaPinterest size={16} />
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="hover:text-white transition"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h5 className="text-base font-semibold mb-4">Quick Links</h5>
                        <ul className="space-y-2 text-sm">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/products">Products</FooterLink>
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                            <FooterLink href="/faqs">FAQ</FooterLink>
                        </ul>
                    </div>
                    <div className="text-center sm:text-left">
                        <h5 className="text-base font-semibold mb-4">Customer Service</h5>
                        <ul className="space-y-2 text-sm">
                            <FooterLink href="/faqs">Shipping Info</FooterLink>
                            <FooterLink href="/faqs">Returns</FooterLink>
                            <FooterLink href="/faqs">Size Guide</FooterLink>
                            <FooterLink href="/faqs">Care Instructions</FooterLink>
                            <FooterLink href="/faqs">Wholesale</FooterLink>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-white/60">
                    <p>© 2024 Essia. All rights reserved.</p>
                    <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
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
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
                {children}
            </Link>
        </li>
    );
}
