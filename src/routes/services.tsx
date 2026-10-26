import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Globe, Zap, Cloud, Palette, ShoppingBag, type LucideIcon } from "lucide-react";
import { Section } from "../components/Section";
import { useContent } from "../lib/use-content";
import flyerBulb from "../assets/flyer-bulb.png.asset.json";
import flyerRocket from "../assets/flyer-rocket.png.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Malloya Teq" },
      { name: "description", content: "Websites, mobile apps, automation, hosting, UX/UI design and e-commerce. South African software & automation studio." },
      { property: "og:title", content: "Services — Malloya Teq" },
      { property: "og:description", content: "Websites, mobile apps, automation, hosting, UX/UI design and e-commerce." },
    ],
  }),
  component: ServicesPage,
});

const serviceCategories = [
  {
    Icon: Globe,
    title: "Website & Mobile App Development",
    desc: "Modern, responsive websites & mobile applications.",
    bg: "oklch(0.62 0.1 195)",
    services: [
      { name: "Static Websites", desc: "Fast, lightweight sites for businesses that need a professional web presence." },
      { name: "Dynamic CMS Websites", desc: "Content management systems that let you update your site with ease." },
      { name: "Android Apps", desc: "Native Android applications built with modern frameworks." },
      { name: "iOS Apps", desc: "Premium iOS applications for iPhone and iPad." },
      { name: "Cross-Platform Apps", desc: "One codebase, multiple platforms — efficient and cost-effective." },
      { name: "Landing Pages", desc: "High-converting pages for campaigns and launches." },
    ],
  },
  {
    Icon: Zap,
    title: "Automation & Workflow Development",
    desc: "Custom software to automate and streamline your operations.",
    bg: "oklch(0.67 0.16 45)",
    services: [
      { name: "Automation Systems", desc: "Automate repetitive tasks and boost productivity." },
      { name: "LMS Platforms", desc: "Learning management systems for schools and training companies." },
      { name: "Booking Systems", desc: "Online appointment and reservation management." },
      { name: "Inventory Systems", desc: "Track stock, orders and supply chain in real-time." },
      { name: "Custom Internal Systems", desc: "Tailored solutions for your unique business processes." },
    ],
  },
  {
    Icon: Cloud,
    title: "Hosting",
    desc: "Everything you need to get and stay online.",
    bg: "oklch(0.52 0.13 305)",
    services: [
      { name: "Web Hosting", desc: "Fast, reliable hosting optimized for performance." },
      { name: "Domain Setup", desc: "Register and configure your business domain." },
      { name: "SSL Certificates", desc: "Secure your website with HTTPS encryption." },
      { name: "Business Emails", desc: "Professional email addresses on your domain." },
      { name: "Website Maintenance", desc: "Ongoing updates, backups and security monitoring." },
    ],
  },
  {
    img: flyerDesign.url,
    title: "UX/UI Design",
    desc: "Clean, modern and user-friendly design.",
    bg: "oklch(0.82 0.13 85)",
    services: [
      { name: "UI Design", desc: "Beautiful interfaces that match your brand." },
      { name: "UX Research", desc: "Understand your users before you build." },
      { name: "Design Systems", desc: "Consistent components across your whole product." },
      { name: "Prototyping", desc: "Clickable prototypes to test ideas fast." },
    ],
  },
  {
    img: flyerCart.url,
    title: "E-commerce Development",
    desc: "Online stores ready to sell from day one.",
    bg: "oklch(0.62 0.1 195)",
    services: [
      { name: "Online Stores", desc: "Full-featured e-commerce with payment gateways and inventory management." },
      { name: "Dropshipping Stores", desc: "Ready-to-sell stores connected to dropshipping suppliers." },
      { name: "Payment Integration", desc: "Local and international payment gateways." },
      { name: "Orders & Stock", desc: "Order management and stock tracking built in." },
    ],
  },
] as const;

function ServicesPage() {
  const { copy } = useContent();
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.62 0.1 195), transparent 70%)" }}
          />
          <div
            className="absolute top-20 left-0 h-[380px] w-[380px] rounded-full opacity-15 blur-[100px]"
            style={{ background: "radial-gradient(circle, oklch(0.67 0.16 45), transparent 70%)" }}
          />
        </div>
        <img
          src={flyerRocket.url}
          alt=""
          className="absolute top-10 left-6 hidden w-16 animate-[float_6s_ease-in-out_infinite] md:block"
        />
        <img
          src={flyerBulb.url}
          alt=""
          className="absolute top-16 right-8 hidden w-16 animate-[float_7s_ease-in-out_infinite_1s] md:block"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Our Services</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {copy.servicesHeroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {copy.servicesHeroSubtitle}
          </p>
        </div>
      </section>

      {serviceCategories.map((cat, ci) => (
        <Section key={cat.title} className={ci % 2 === 1 ? "!bg-surface" : ""}>
          <div className="mb-12 flex items-center gap-5">
            <img src={cat.img} alt="" className="h-16 w-auto shrink-0 object-contain" />
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">{cat.title}</h2>
              <p className="text-muted-foreground">{cat.desc}</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cat.services.map((s, si) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.08, duration: 0.5 }}
                className="glass-card-hover p-8"
              >
                <h3 className="mb-2 text-lg font-bold text-foreground">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <div className="cta-navy p-12 text-center md:p-20">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Need a Custom Solution?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75">
            Every business is unique. Let's discuss your specific requirements and build the perfect solution.
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
