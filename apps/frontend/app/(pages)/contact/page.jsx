"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

/* -------------------------
    INLINE UI COMPONENTS
--------------------------*/

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className = "", variant = "default", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition px-6 py-3 focus:outline-none";

  const styles = {
    default: "bg-pink-600 text-white hover:bg-pink-700",
    outline:
      "border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white",
    light: "bg-white text-pink-600 hover:bg-gray-100"
  };

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = (props) => (
  <input
    {...props}
    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full px-3 py-2 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-pink-600 focus:outline-none"
  />
);

/* -------------------------
        CONTACT PAGE
--------------------------*/

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake request delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      e.target.reset();

      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-pink-600" />,
      title: "Visit Us",
      details: ["New Delhi, India"]
    },
    {
      icon: <Phone className="h-6 w-6 text-pink-600" />,
      title: "Call Us",
      details: ["+91 99999 12345", "Mon - Fri | 9AM - 6PM"]
    },
    {
      icon: <Mail className="h-6 w-6 text-pink-600" />,
      title: "Email",
      details: ["support@messia.in"]
    },
    {
      icon: <Clock className="h-6 w-6 text-pink-600" />,
      title: "Business Hours",
      details: ["Mon - Sat | 9AM - 7PM"]
    }
  ];

  const faqs = [
    {
      question: "Can I customize a gift box?",
      answer:
        "Yes! Many of our products allow personalization including message notes and selection of items."
    },
    {
      question: "How fast is delivery?",
      answer:
        "We generally deliver within 24–48 hours across most cities in India."
    },
    {
      question: "What if my gift arrives damaged?",
      answer:
        "Contact us immediately and we will replace it at no cost."
    },
    {
      question: "Do you provide COD?",
      answer:
        "Yes — Cash On Delivery is available on most orders."
    }
  ];

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 pt-20 min-h-screen">

        {/* ================= HERO ================= */}
        <section className="bg-gradient-to-br from-pink-50 to-red-100 py-20 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">
            Get in Touch
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600">
            Questions about gifting or orders?  
            Our team is always here to help you.
          </p>
        </section>

        {/* ================= FORM + CONTACT INFO ================= */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

            {/* CONTACT FORM */}
            <Card>
              <CardContent>
                <h2 className="text-2xl font-semibold mb-6">
                  Send Us a Message
                </h2>

                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                  <Input required placeholder="Your Name" />
                  <Input required type="email" placeholder="Your Email" />
                  <Input required placeholder="Subject" />
                  <Textarea required placeholder="Write your message..." />

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {submitted && (
                    <p className="text-green-600 text-center mt-4">
                      ✅ Message sent successfully!
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* CONTACT CARDS */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, i) => (
                <Card key={i}>
                  <CardContent>
                    <div className="flex gap-4 items-start">
                      {info.icon}
                      <div>
                        <h3 className="font-semibold mb-1">
                          {info.title}
                        </h3>

                        {info.details.map((d, idx) => (
                          <p key={idx} className="text-sm text-gray-600">
                            {d}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="bg-pink-50 py-16">
          <div className="max-w-5xl mx-auto px-6">

            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              FAQs
            </h2>

            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <Card key={i}>
                  <CardContent>
                    <h3 className="font-semibold mb-3">
                      {faq.question}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-600 mb-3">
                Didn’t find your answer?
              </p>

              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("contact-form")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Ask us directly
              </Button>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}
