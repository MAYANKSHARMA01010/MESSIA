"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-[var(--surface)] border rounded-xl shadow-sm ${className}`}
  >
    {children}
  </div>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition px-6 py-3 focus:outline-none";
  const styles = {
    default: "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]",
    outline:
      "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
    light: "bg-white text-[var(--primary)] hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
const Input = (props) => (
  <input
    {...props}
    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
  />
);
const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full px-3 py-2 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
  />
);
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      e.target.reset();
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-[var(--primary)]" />,
      title: "Visit Us",
      details: ["New Delhi, India"],
    },
    {
      icon: <Phone className="h-6 w-6 text-[var(--primary)]" />,
      title: "Call Us",
      details: ["+91 99999 12345", "Mon - Fri | 9AM - 6PM"],
    },
    {
      icon: <Mail className="h-6 w-6 text-[var(--primary)]" />,
      title: "Email",
      details: ["support@messia.in"],
    },
    {
      icon: <Clock className="h-6 w-6 text-[var(--primary)]" />,
      title: "Business Hours",
      details: ["Mon - Sat | 9AM - 7PM"],
    },
  ];
  const faqs = [
    {
      question: "Can I customize a gift box?",
      answer:
        "Yes! Many of our products allow personalization including message notes and selection of items.",
    },
    {
      question: "How fast is delivery?",
      answer:
        "We generally deliver within 24–48 hours across most cities in India.",
    },
    {
      question: "What if my gift arrives damaged?",
      answer: "Contact us immediately and we will replace it at no cost.",
    },
    {
      question: "Do you provide COD?",
      answer: "Yes — Cash On Delivery is available on most orders.",
    },
  ];
  return (
    <>
      <div className="bg-[var(--background)] pt-20 min-h-screen">
        {}
        <section className="bg-gradient-to-br from-[var(--surface-alt)] to-[var(--primary-light)]/10 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
          <h1 className="text-5xl font-serif font-bold mb-6 text-[var(--foreground)] relative z-10">
            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-xl font-light relative z-10">
            Questions about gifting or orders? Our team is always here to help
            you.
          </p>
        </section>
        {}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
            {}
            <Card className="glass-panel border-none shadow-2xl p-2">
              <CardContent>
                <h2 className="text-3xl font-serif font-bold mb-8 text-[var(--foreground)]">
                  Send Us a Message
                </h2>
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <Input
                    required
                    placeholder="Your Name"
                    className="bg-[var(--surface)] border-[var(--border)]"
                  />
                  <Input
                    required
                    type="email"
                    placeholder="Your Email"
                    className="bg-[var(--surface)] border-[var(--border)]"
                  />
                  <Input
                    required
                    placeholder="Subject"
                    className="bg-[var(--surface)] border-[var(--border)]"
                  />
                  <Textarea
                    required
                    placeholder="Write your message..."
                    className="bg-[var(--surface)] border-[var(--border)]"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full shadow-lg hover:shadow-glow py-4 text-lg"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  {submitted && (
                    <p className="text-green-600 text-center mt-4 font-medium animate-fade-in">
                      ✅ Message sent successfully!
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
            {}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, i) => (
                <Card
                  key={i}
                  className="hover:-translate-y-1 transition-transform duration-300 border border-[var(--border)]"
                >
                  <CardContent>
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[var(--surface-alt)] rounded-full text-[var(--primary)]">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-lg mb-2 text-[var(--foreground)]">
                          {info.title}
                        </h3>
                        {info.details.map((d, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
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
        {}
        <section className="bg-[var(--surface-alt)] py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-serif font-bold text-center mb-16 text-[var(--foreground)]">
              FAQs
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <Card
                  key={i}
                  className="border-none shadow-sm hover:shadow-md transition-all"
                >
                  <CardContent>
                    <h3 className="font-serif font-bold text-lg mb-3 text-[var(--foreground)]">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-16">
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                Didn’t find your answer?
              </p>
              <Button
                variant="outline"
                className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
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
    </>
  );
}
