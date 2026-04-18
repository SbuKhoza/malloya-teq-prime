import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Section, SectionHeader } from "../components/Section";
import { useContent } from "../lib/use-content";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Malloya Teq" },
      { name: "description", content: "View our live websites and projects. Premium web development portfolio from South Africa." },
      { property: "og:title", content: "Portfolio — Malloya Teq" },
      { property: "og:description", content: "View our live websites and projects." },
    ],
  }),
  component: PortfolioPage,
});

const filters = [
  { label: "All", value: "all" },
  { label: "Static", value: "static" },
  { label: "Dynamic", value: "dynamic" },
  { label: "Store", value: "store" },
] as const;

function PortfolioPage() {
  const { portfolio: portfolioItems } = useContent();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <>
      <section className="px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Our Work</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Live <span className="gold-gradient-text">Websites</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore websites and platforms we've built for businesses across South Africa.
          </p>
        </div>
      </section>

      <Section>
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground glass-card"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card-hover group overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.screenshot}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  <span className="badge-gold !py-0.5 !text-[0.6rem]">{item.category}</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold inline-block !px-4 !py-2 text-xs no-underline"
                >
                  Visit Website →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-card glow-gold p-12 text-center md:p-20">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Want a Website Like These?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Let's build your dream website. Get a free quote today.
          </p>
          <div className="mt-8">
            <Link to="/quote" className="btn-gold inline-block text-base no-underline">
              Request Quote
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
