import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "../components/Section";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Malloya Teq" },
      { name: "description", content: "Frequently asked questions about our services, pricing and process." },
      { property: "og:title", content: "FAQ — Malloya Teq" },
      { property: "og:description", content: "Frequently asked questions about our services." },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  { q: "How long does it take to build a website?", a: "Depending on complexity, static websites take 1-2 weeks, dynamic sites 2-4 weeks, and e-commerce stores 3-6 weeks. We'll give you an accurate timeline during the quote process." },
  { q: "Do you offer ongoing support after launch?", a: "Yes! All our packages include initial support, and we offer affordable maintenance plans for ongoing updates, backups, and security monitoring." },
  { q: "Can I update my website myself?", a: "Our CMS packages include an admin dashboard where you can easily update content, add blog posts, and manage your site without any coding knowledge." },
  { q: "What payment methods do you accept?", a: "We accept EFT, bank transfers, and various online payment methods. We offer flexible payment plans for larger projects." },
  { q: "Do you work with businesses outside South Africa?", a: "Absolutely! While we're proudly South African, we work with businesses worldwide. Our pricing is in ZAR but we can provide quotes in other currencies." },
  { q: "What's included in the free hosting?", a: "Every website package includes free monthly hosting, a free .co.za domain of your choice, and 3 professional email addresses. Other domain extensions have separate pricing." },
  { q: "Can you build a mobile app for both Android and iOS?", a: "Yes! We build native Android and iOS apps, as well as cross-platform apps that work on both systems from a single codebase." },
  { q: "What if I need something custom that's not in your packages?", a: "No problem — we specialize in custom solutions. Request a quote and describe your requirements. We'll create a tailored proposal for your project." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section className="px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">FAQ</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h1>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="pr-4 text-base font-semibold text-foreground">{faq.q}</span>
                <motion.svg
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-5 w-5 shrink-0 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
