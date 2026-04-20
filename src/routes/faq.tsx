import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "../components/Section";
import { useContent } from "../lib/use-content";

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

function FAQPage() {
  const { faqs, copy } = useContent();
  const [open, setOpen] = useState<number | null>(null);
  const titleWords = copy.faqHeroTitle.split(" ");
  const lastWord = titleWords.slice(-1).join(" ");
  const restWords = titleWords.slice(0, -1).join(" ");

  return (
    <>
      <section className="px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">{copy.faqHeroBadge}</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            {restWords} <span className="gold-gradient-text">{lastWord}</span>
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
