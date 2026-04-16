import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Section, SectionHeader } from "../components/Section";
import { websitePackages, appPackages, includedBenefits } from "../data/packages";

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

function PricingToggle({ isAnnual, onToggle }: { isAnnual: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative h-8 w-16 rounded-full transition-colors"
        style={{
          background: isAnnual
            ? "linear-gradient(135deg, oklch(0.78 0.08 65), oklch(0.7 0.1 55))"
            : "oklch(0.3 0 0)",
        }}
      >
        <motion.div
          className="absolute top-1 h-6 w-6 rounded-full bg-foreground"
          animate={{ left: isAnnual ? "2.25rem" : "0.25rem" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
        Annual <span className="badge-gold ml-1 !text-[0.65rem]">Save up to 17%</span>
      </span>
    </div>
  );
}

function PackageCard({
  name,
  monthlyPrice,
  annualPrice,
  features,
  popular,
  isAnnual,
  cta,
}: {
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  popular?: boolean;
  isAnnual: boolean;
  cta?: string;
}) {
  const price = isAnnual ? annualPrice : monthlyPrice;
  const period = isAnnual ? "/yr" : "/mo";

  return (
    <div className={`glass-card-hover relative flex flex-col p-8 ${popular ? "glow-gold" : ""}`}>
      {popular && <span className="badge-gold mb-3 inline-block self-start">Most Popular</span>}
      <h3 className="text-xl font-bold text-foreground">{name}</h3>
      {price !== null ? (
        <div className="mt-3 mb-6">
          <span className="text-4xl font-extrabold gold-gradient-text">R{price.toLocaleString()}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      ) : (
        <div className="mt-3 mb-6">
          <span className="text-lg font-semibold text-muted-foreground">Custom quote required</span>
        </div>
      )}
      <ul className="mb-8 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Link
        to="/quote"
        className={`${popular ? "btn-gold" : "btn-outline-gold"} mt-auto text-center text-sm no-underline`}
      >
        {cta || "Get Started"}
      </Link>
    </div>
  );
}

function PackagesPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const staticPkgs = websitePackages.filter((p) => p.category === "static");
  const dynamicPkgs = websitePackages.filter((p) => p.category === "dynamic");
  const storePkgs = websitePackages.filter((p) => p.category === "store");

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.08 65), transparent 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Pricing</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Packages & <span className="gold-gradient-text">Pricing</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Flexible plans designed for South African businesses. Choose monthly or save with annual billing.
          </p>
          <div className="mt-10">
            <PricingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual(!isAnnual)} />
          </div>
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
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
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

      {/* Static */}
      <Section>
        <SectionHeader badge="Static Websites" title="Static Website Packages" description="Perfect for businesses that need a professional web presence." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staticPkgs.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard {...pkg} isAnnual={isAnnual} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Dynamic */}
      <Section className="!bg-surface">
        <SectionHeader badge="Dynamic Websites" title="CMS Website Packages" description="Manage your content with powerful admin dashboards." />
        <div className="grid gap-6 sm:grid-cols-2">
          {dynamicPkgs.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard {...pkg} isAnnual={isAnnual} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Store */}
      <Section>
        <SectionHeader badge="Online Stores" title="E-Commerce Packages" description="Sell online with powerful store solutions." />
        <div className="grid gap-6 sm:grid-cols-2">
          {storePkgs.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard {...pkg} isAnnual={isAnnual} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* App */}
      <Section className="!bg-surface">
        <SectionHeader badge="Mobile Apps" title="App Development Packages" description="Custom mobile applications built for your business." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appPackages.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard {...pkg} isAnnual={isAnnual} />
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
