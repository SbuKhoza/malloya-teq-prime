import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, ShoppingBag } from "lucide-react";
import { Section } from "../components/Section";
import { useContent } from "../lib/use-content";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Our Work — Malloya Teq" },
      { name: "description", content: "Featured projects from Malloya Teq — apps and platforms built born ekasi, available on iOS and Android." },
      { property: "og:title", content: "Our Work — Malloya Teq" },
      { property: "og:description", content: "Featured projects built born ekasi." },
    ],
  }),
  component: PortfolioPage,
});

const projectIcon: Record<string, LucideIcon> = {
  MapPin,
  Truck: MapPin,
  Search: MapPin,
  Store: ShoppingBag,
};

const projectColor: Record<string, string> = {
  teal: "oklch(0.62 0.1 195)",
  orange: "oklch(0.67 0.16 45)",
  purple: "oklch(0.52 0.13 305)",
  red: "oklch(0.6 0.18 30)",
};

function PortfolioPage() {
  const { portfolio: items } = useContent();

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.67 0.16 45), transparent 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Featured Projects</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Built <span className="gold-gradient-text">Born Ekasi</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Apps and platforms we've designed, built and shipped — proudly made in Soweto.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = projectIcon[item.icon ?? "MapPin"] ?? MapPin;
            const bg = projectColor[item.color ?? "teal"] ?? projectColor.teal;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-card-hover group overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.screenshot}
                    alt={item.name}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <div className="icon-blob h-11 w-11 text-white" style={{ background: bg }}>
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                    {item.platforms?.map((p) => (
                      <span key={p} className={p === "iOS" ? "chip chip-ios" : "chip chip-android"}>
                        {p}
                      </span>
                    ))}
                  </div>
                  <p className="mb-5 text-sm text-muted-foreground">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold !px-5 !py-2 text-xs no-underline"
                  >
                    Visit →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="cta-navy p-12 text-center md:p-20">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Want Us to Build Yours?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75">
            Let's turn your idea into the next featured project. Get a free quote today.
          </p>
          <div className="mt-8">
            <Link to="/quote" className="btn-gold text-base no-underline">
              Get a Quote
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
