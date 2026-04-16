import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "../components/Section";
import { reviews } from "../data/reviews";
import { websitePackages } from "../data/packages";

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
  {
    icon: "🌐",
    title: "Website Development",
    desc: "Static sites, dynamic CMS, online stores & dropshipping platforms.",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    desc: "Android, iOS & cross-platform apps built for performance.",
  },
  {
    icon: "⚙️",
    title: "Software Systems",
    desc: "LMS, automation, booking, inventory & custom internal systems.",
  },
  {
    icon: "☁️",
    title: "Hosting & Domains",
    desc: "Web hosting, domain setup, SSL, business emails & maintenance.",
  },
];

const whyUs = [
  { title: "Premium Quality", desc: "Every project is crafted to the highest standards." },
  { title: "South African Focused", desc: "We understand the local market and business needs." },
  { title: "Affordable Packages", desc: "Competitive pricing without compromising quality." },
  { title: "Ongoing Support", desc: "We don't disappear after launch — we're here to help." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-32 md:pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.08 65), transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: "radial-gradient(circle, oklch(0.75 0.08 210), transparent 70%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="badge-gold mb-6 inline-block">South Africa's Premium Tech Partner</span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-7xl">
              Websites, Apps &{" "}
              <span className="gold-gradient-text">Smart Business</span>{" "}
              Systems
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Helping businesses grow through websites, mobile apps, automation and custom software.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/quote" className="btn-gold inline-block text-base no-underline">
                Request Quote
              </Link>
              <Link to="/portfolio" className="btn-outline-gold inline-block text-base no-underline">
                View Work
              </Link>
            </div>
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
              <div className="mb-4 text-4xl">{s.icon}</div>
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
                    <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
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
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
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
                  <svg key={j} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
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
