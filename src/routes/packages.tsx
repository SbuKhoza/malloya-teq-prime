import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeader } from "../components/Section";
import { websitePackages, appPackages, includedBenefits, type Package } from "../data/packages";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages & Pricing — Malloya Teq" },
      { name: "description", content: "Affordable website, app and software packages. Monthly and annual pricing starting from R399/month." },
      { property: "og:title", content: "Packages & Pricing — Malloya Teq" },
      { property: "og:description", content: "Affordable website, app and software packages starting from R399/month." },
    ],
  }),
  component: PackagesPage,
});

function PackageCard({ pkg }: { pkg: Package }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const hasPricing = pkg.monthlyPrice !== null && pkg.annualPrice !== null;
  const price = isAnnual ? pkg.annualPrice : pkg.monthlyPrice;
  const period = isAnnual ? "/yr" : "/mo";

  return (
    <div className={`glass-card-hover relative flex flex-col p-8 ${pkg.popular ? "glow-gold" : ""}`}>
      {pkg.popular && <span className="badge-gold mb-3 inline-block self-start">Most Popular</span>}
      <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>

      {hasPricing ? (
        <>
          <div className="mt-3 mb-4">
            <span className="text-4xl font-extrabold gold-gradient-text">R{price!.toLocaleString()}</span>
            <span className="text-muted-foreground">{period}</span>
          </div>
          {/* Per-card billing toggle */}
          <div className="mb-6 inline-flex self-start rounded-full border border-border bg-muted/50 p-1 text-xs font-medium">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative rounded-full px-3 py-1 transition-colors ${!isAnnual ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {!isAnnual && (
                <motion.span
                  layoutId={`toggle-${pkg.id}`}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, oklch(0.7 0.08 65), oklch(0.65 0.09 60))" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative">Monthly</span>
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative rounded-full px-3 py-1 transition-colors ${isAnnual ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {isAnnual && (
                <motion.span
                  layoutId={`toggle-${pkg.id}`}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, oklch(0.7 0.08 65), oklch(0.65 0.09 60))" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative">Annual</span>
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3 mb-6">
          <span className="text-lg font-semibold text-muted-foreground">Custom quote required</span>
        </div>
      )}

      <ul className="mb-8 flex-1 space-y-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
            {f}
          </li>
        ))}
      </ul>
      <Link
        to="/quote"
        className={`${pkg.popular ? "btn-gold" : "btn-outline-gold"} mt-auto text-center text-sm no-underline`}
      >
        {pkg.cta || "Get Started"}
      </Link>
    </div>
  );
}

function PackagesPage() {
  const staticPkgs = websitePackages.filter((p) => p.category === "static");
  const dynamicPkgs = websitePackages.filter((p) => p.category === "dynamic");
  const storePkgs = websitePackages.filter((p) => p.category === "store");

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.85 0.06 65), transparent 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Pricing</span>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Packages & <span className="gold-gradient-text">Pricing</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Flexible plans designed for South African businesses. Switch between monthly and annual billing on any package.
          </p>
        </div>
      </section>

      {/* Included Benefits */}
      <Section>
        <div className="glass-card glow-gold p-8 md:p-12">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div>
              <span className="badge-gold mb-2 inline-block">FREE Included</span>
              <h3 className="text-xl font-bold text-foreground">With Every Website Package</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {includedBenefits.map((b) => (
                <div key={b} className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                  <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            * Other domain extensions (.com, .org, .net etc.) are subject to separate pricing.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeader badge="Static Websites" title="Static Website Packages" description="Perfect for businesses that need a professional web presence." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staticPkgs.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="!bg-surface">
        <SectionHeader badge="Dynamic Websites" title="CMS Website Packages" description="Manage your content with powerful admin dashboards." />
        <div className="grid gap-6 sm:grid-cols-2">
          {dynamicPkgs.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader badge="Online Stores" title="E-Commerce Packages" description="Sell online with powerful store solutions." />
        <div className="grid gap-6 sm:grid-cols-2">
          {storePkgs.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="!bg-surface">
        <SectionHeader badge="Mobile Apps" title="App Development Packages" description="Custom mobile applications built for your business." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appPackages.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
