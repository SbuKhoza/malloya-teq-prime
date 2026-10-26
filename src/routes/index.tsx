import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Star,
  ShieldCheck,
  MapPin,
  Wallet,
  LifeBuoy,
  Globe,
  Zap,
  Cloud,
  Palette,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "../components/Section";
import { useContent } from "../lib/use-content";
import heroBanner from "../assets/malloya-hero-banner.png.asset.json";
import flyerRocket from "../assets/flyer-rocket.png.asset.json";
import flyerBulb from "../assets/flyer-bulb.png.asset.json";
import flyerGear from "../assets/flyer-gear.png.asset.json";
import skylineLeft from "../assets/flyer-skyline-left.png.asset.json";
import skylineRight from "../assets/flyer-skyline-right.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Malloya Teq — Building Tech, the Kasi Way" },
      { name: "description", content: "Websites, mobile apps, automation, hosting, UX/UI design and e-commerce. South African software & automation studio — proudly born ekasi." },
      { property: "og:title", content: "Malloya Teq — Building Tech, the Kasi Way" },
      { property: "og:description", content: "Websites, mobile apps, automation and design — proudly born ekasi, built for businesses everywhere." },
    ],
  }),
  component: HomePage,
});

const services = [
  { Icon: Globe, bg: "oklch(0.62 0.1 195)", title: "Website & Mobile App Development", desc: "Modern, responsive websites and apps for Android, iOS and cross-platform." },
  { Icon: Zap, bg: "oklch(0.67 0.16 45)", title: "Automation & Workflow Development", desc: "Automations, LMS, booking and inventory systems that save you hours every week." },
  { Icon: Cloud, bg: "oklch(0.52 0.13 305)", title: "Hosting", desc: "Fast, secure and reliable hosting — domains, SSL and business emails, sorted." },
  { Icon: Palette, bg: "oklch(0.78 0.13 85)", title: "UX/UI Design", desc: "Clean, modern and user-friendly interfaces designed for real people." },
  { Icon: ShoppingBag, bg: "oklch(0.62 0.1 195)", title: "E-commerce Development", desc: "Online stores and dropshipping platforms ready to sell from day one." },
] as const;

const whyUs = [
  { Icon: ShieldCheck, title: "Premium Quality", desc: "Every project is crafted to the highest standards." },
  { Icon: MapPin, title: "Proudly Ekasi", desc: "Built in Soweto, for South African businesses and beyond." },
  { Icon: Wallet, title: "Fair Pricing", desc: "Great value without compromising quality." },
  { Icon: LifeBuoy, title: "Ongoing Support", desc: "We don't disappear after launch — we're here to help." },
] as const;

const projectIcon: Record<string, LucideIcon> = {
  MapPin,
  Truck: MapPin,
  Search: MapPin,
  Store: ShieldCheck,
};

const projectColor: Record<string, string> = {
  teal: "oklch(0.62 0.1 195)",
  orange: "oklch(0.67 0.16 45)",
  purple: "oklch(0.52 0.13 305)",
  red: "oklch(0.6 0.18 30)",
};

function HomePage() {
  const { reviews, copy, portfolio } = useContent();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full opacity-20 blur-[110px]"
            style={{ background: "radial-gradient(circle, oklch(0.62 0.1 195), transparent 70%)" }}
          />
          <div
            className="absolute top-10 right-0 h-[380px] w-[380px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, oklch(0.67 0.16 45), transparent 70%)" }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <span className="badge-gold mb-6 inline-block">{copy.homeHeroBadge}</span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-[3.4rem]">
              {copy.homeHeroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:mx-0 md:text-lg">
              {copy.homeHeroSubtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Link to="/quote" className="btn-gold text-base no-underline">
                Get a Quote
              </Link>
              <Link to="/portfolio" className="btn-outline-gold text-base no-underline">
                See Our Work
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Floating flyer doodles around the brand banner */}
            <img
              src={flyerRocket.url}
              alt=""
              className="absolute -top-6 -right-2 z-10 w-14 animate-[float_6s_ease-in-out_infinite] md:-top-8 md:right-6 md:w-20"
            />
            <img
              src={flyerGear.url}
              alt=""
              className="absolute -bottom-4 left-2 z-10 w-10 animate-[float_7s_ease-in-out_infinite_1s] md:-bottom-6 md:left-0 md:w-14"
            />
            <img
              src={flyerBulb.url}
              alt=""
              className="absolute top-1/2 -left-4 z-10 w-12 animate-[float_8s_ease-in-out_infinite_0.5s] md:-left-10 md:w-16"
            />
            <img
              src={copy.homeHeroImage || heroBanner.url}
              alt="Malloya Group — Born Ekasi! Software & automation studio"
              className="mx-auto w-full max-w-xl rounded-[2.5rem] md:max-w-3xl lg:max-w-4xl"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <Section>
        <SectionHeader badge="What We Do" title="Our Services" description="Modern, responsive and user-friendly digital products for businesses of all sizes." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card-hover p-8"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: s.bg, color: "white", boxShadow: `0 10px 25px -8px ${s.bg}` }}
              >
                <s.Icon className="h-7 w-7" strokeWidth={2.2} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="btn-outline-gold text-sm no-underline">
            View All Services →
          </Link>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section className="!bg-surface relative overflow-hidden">
        <img src={skylineLeft.url} alt="" className="pointer-events-none absolute bottom-0 left-0 hidden h-56 opacity-70 lg:block" />
        <img src={skylineRight.url} alt="" className="pointer-events-none absolute right-0 bottom-0 hidden h-56 opacity-70 lg:block" />
        <SectionHeader badge="Featured Projects" title="Built Born Ekasi" description="Products we've designed, built and shipped — available on iOS and Android." />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((item, i) => {
            const Icon = projectIcon[item.icon ?? "MapPin"] ?? MapPin;
            const bg = projectColor[item.color ?? "teal"] ?? projectColor.teal;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
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
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="icon-blob h-10 w-10 text-white" style={{ background: bg }}>
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {item.platforms && item.platforms.length > 0 && (
                    <div className="mt-3 flex gap-1.5">
                      {item.platforms.map((p) => (
                        <span key={p} className={p === "iOS" ? "chip chip-ios" : "chip chip-android"}>
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="relative mt-10 text-center">
          <Link to="/portfolio" className="btn-gold text-sm no-underline">
            Explore Our Projects →
          </Link>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <SectionHeader badge="Why Us" title="Why Choose Malloya Teq" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-8"
            >
              <div className="icon-blob mb-4 h-12 w-12 bg-primary text-white">
                <item.Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section className="!bg-surface">
        <SectionHeader badge="Testimonials" title="What Our Clients Say" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-8"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-navy-foreground">
                  {review.avatar}
                </div>
                <span className="text-sm font-semibold text-foreground">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="cta-navy relative overflow-hidden p-12 text-center md:p-20">
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[80px]"
            style={{ background: "radial-gradient(circle, oklch(0.67 0.16 45), transparent 70%)" }}
          />
          <img
            src={flyerRocket.url}
            alt=""
            className="absolute top-8 left-8 hidden w-16 animate-[float_6s_ease-in-out_infinite] opacity-90 md:block"
          />
          <span className="badge-gold mb-6 inline-block !bg-secondary" style={{ boxShadow: "3px 3px 0 oklch(1 0 0 / 25%)" }}>
            Born Ekasi!
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Ready to Build Something <span className="text-sun">Amazing</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-foreground/75">
            Get a free consultation and let's bring your digital vision to life.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/quote" className="btn-gold text-base no-underline">
              Get a Quote
            </Link>
            <a
              href="tel:0682602439"
              className="btn-outline-gold !border-secondary !text-white text-base no-underline"
              style={{ boxShadow: "4px 4px 0 oklch(0.67 0.16 45 / 45%)" }}
            >
              Call 068 260 2439
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
