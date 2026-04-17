import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Globe, Smartphone, Settings, Cloud, Check, Star, ShieldCheck, MapPin, Wallet, LifeBuoy } from "lucide-react";
import { Section, SectionHeader } from "../components/Section";
import { reviews } from "../data/reviews";
import { websitePackages } from "../data/packages";
import heroIllustration from "../assets/hero-illustration.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Malloya Teq — Websites, Apps & Smart Business Systems" },
      { name: "description", content: "Helping businesses grow through websites, mobile apps, automation and custom software. Premium South African tech company." },
      { property: "og:title", content: "Malloya Teq — Websites, Apps & Smart Business Systems" },
      { property: "og:description", content: "Helping businesses grow through websites, mobile apps, automation and custom software." },
    ],
  }),
  component: HomePage,
});

const services = [
  { Icon: Globe, title: "Website Development", desc: "Static sites, dynamic CMS, online stores & dropshipping platforms." },
  { Icon: Smartphone, title: "Mobile App Development", desc: "Android, iOS & cross-platform apps built for performance." },
  { Icon: Settings, title: "Software Systems", desc: "LMS, automation, booking, inventory & custom internal systems." },
  { Icon: Cloud, title: "Hosting & Domains", desc: "Web hosting, domain setup, SSL, business emails & maintenance." },
];

const whyUs = [
  { Icon: ShieldCheck, title: "Premium Quality", desc: "Every project is crafted to the highest standards." },
  { Icon: MapPin, title: "South African Focused", desc: "We understand the local market and business needs." },
  { Icon: Wallet, title: "Affordable Packages", desc: "Competitive pricing without compromising quality." },
  { Icon: LifeBuoy, title: "Ongoing Support", desc: "We don't disappear after launch — we're here to help." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.85 0.06 65), transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, oklch(0.85 0.06 210), transparent 70%)" }}
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <span className="badge-gold mb-6 inline-block">South Africa's Premium Tech Partner</span>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Websites, Apps &{" "}
              <span className="gold-gradient-text">Smart Business</span>{" "}
              Systems
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:mx-0 md:text-lg">
              Helping businesses grow through websites, mobile apps, automation and custom software.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Link to="/quote" className="btn-gold inline-block text-base no-underline">
                Request Quote
              </Link>
              <Link to="/portfolio" className="btn-outline-gold inline-block text-base no-underline">
                View Work
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative md:-mr-8 lg:-mr-16"
          >
            <img
              src={heroIllustration}
              alt="Malloya Teq — websites, apps and dashboards"
              width={1280}
              height={1024}
              className="mx-auto w-full max-w-lg md:max-w-none md:scale-110 lg:scale-125"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <Section>
        <SectionHeader badge="What We Do" title="Our Services" description="End-to-end digital solutions for businesses of all sizes." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card-hover p-8 text-center"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <s.Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="btn-outline-gold inline-block text-sm no-underline">
            View All Services →
          </Link>
        </div>
      </Section>

      {/* Packages Preview */}
      <Section className="!bg-surface">
        <SectionHeader badge="Pricing" title="Packages for Every Business" description="Flexible monthly and annual plans starting from R399/month." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {websitePackages.filter((p) => p.popular).map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card-hover relative p-8"
            >
              <span className="badge-gold mb-3 inline-block">Popular</span>
              <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
              <div className="mt-3 mb-6">
                <span className="text-3xl font-extrabold gold-gradient-text">
                  R{pkg.monthlyPrice?.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="mb-8 space-y-2">
                {pkg.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/packages" className="btn-gold inline-block text-sm no-underline">
            View All Packages →
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
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <item.Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
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
                  <Star key={j} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {review.avatar}
                </div>
                <span className="text-sm font-medium text-foreground">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="glass-card glow-gold p-12 text-center md:p-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Ready to Build Something <span className="gold-gradient-text">Amazing</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Get a free consultation and let's bring your digital vision to life.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/quote" className="btn-gold inline-block text-base no-underline">
              Request Quote
            </Link>
            <Link to="/contact" className="btn-outline-gold inline-block text-base no-underline">
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
