import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Globe, Smartphone, Settings, Cloud, type LucideIcon } from "lucide-react";
import { Section } from "../components/Section";
import { useContent } from "../lib/use-content";

const icons: Record<string, LucideIcon> = {
  "Website Development": Globe,
  "Mobile App Development": Smartphone,
  "Software Systems": Settings,
  "Hosting & Infrastructure": Cloud,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Malloya Teq" },
      { name: "description", content: "Website development, mobile apps, software systems, hosting and more. Premium digital solutions from South Africa." },
      { property: "og:title", content: "Services — Malloya Teq" },
      { property: "og:description", content: "Website development, mobile apps, software systems, hosting and more." },
    ],
  }),
  component: ServicesPage,
});

const serviceCategories = [
  {
    title: "Website Development",
    desc: "From simple landing pages to complex e-commerce platforms.",
    services: [
      { name: "Static Websites", desc: "Fast, lightweight sites for businesses that need a professional web presence." },
      { name: "Dynamic CMS Websites", desc: "Content management systems that let you update your site with ease." },
      { name: "Online Stores", desc: "Full-featured e-commerce with payment gateways and inventory management." },
      { name: "Dropshipping Stores", desc: "Ready-to-sell stores connected to dropshipping suppliers." },
    ],
  },
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications.",
    services: [
      { name: "Android Apps", desc: "Native Android applications built with modern frameworks." },
      { name: "iOS Apps", desc: "Premium iOS applications for iPhone and iPad." },
      { name: "Cross Platform Apps", desc: "One codebase, multiple platforms — efficient and cost-effective." },
    ],
  },
  {
    title: "Software Systems",
    desc: "Custom software to automate and streamline your operations.",
    services: [
      { name: "LMS Platforms", desc: "Learning management systems for schools and training companies." },
      { name: "Automation Systems", desc: "Automate repetitive tasks and boost productivity." },
      { name: "Booking Systems", desc: "Online appointment and reservation management." },
      { name: "Inventory Systems", desc: "Track stock, orders and supply chain in real-time." },
      { name: "Custom Internal Systems", desc: "Tailored solutions for your unique business processes." },
    ],
  },
  {
    title: "Hosting & Infrastructure",
    desc: "Everything you need to get and stay online.",
    services: [
      { name: "Web Hosting", desc: "Fast, reliable hosting optimized for performance." },
      { name: "Domain Setup", desc: "Register and configure your business domain." },
      { name: "SSL Certificates", desc: "Secure your website with HTTPS encryption." },
      { name: "Business Emails", desc: "Professional email addresses on your domain." },
      { name: "Website Maintenance", desc: "Ongoing updates, backups and security monitoring." },
    ],
  },
];

function ServicesPage() {
  const { copy } = useContent();
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.75 0.08 210), transparent 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="badge-ice mb-4 inline-block">Our Services</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            {copy.servicesHeroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {copy.servicesHeroSubtitle}
          </p>
        </div>
      </section>

      {serviceCategories.map((cat, ci) => (
        <Section key={cat.title} className={ci % 2 === 1 ? "!bg-surface" : ""}>
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              {(() => { const I = icons[cat.title]; return <I className="h-7 w-7 text-primary" strokeWidth={1.75} />; })()}
            </div>
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
                <h3 className="mb-2 text-lg font-semibold text-foreground">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <div className="glass-card glow-ice p-12 text-center md:p-20">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Need a Custom Solution?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every business is unique. Let's discuss your specific requirements and build the perfect solution.
          </p>
          <div className="mt-8">
            <Link to="/quote" className="btn-gold inline-block text-base no-underline">
              Request a Quote
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
