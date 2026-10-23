import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket, Globe, Lock, Mail, ShieldCheck, RefreshCw, type LucideIcon } from "lucide-react";
import { Section } from "../components/Section";

export const Route = createFileRoute("/hosting-info")({
  head: () => ({
    meta: [
      { title: "Hosting & Domains — Malloya Teq" },
      { name: "description", content: "Fast, secure and reliable hosting. Domains, SSL and professional business emails — sorted by Malloya Teq." },
      { property: "og:title", content: "Hosting & Domains — Malloya Teq" },
    ],
  }),
  component: HostingInfoPage,
});

const hostingFeatures: { Icon: LucideIcon; bg: string; title: string; desc: string }[] = [
  { Icon: Rocket, bg: "oklch(0.62 0.1 195)", title: "Fast Hosting", desc: "High-performance servers with 99.9% uptime for your website." },
  { Icon: Globe, bg: "oklch(0.67 0.16 45)", title: "Domain Setup", desc: "We register and configure your business domain for you." },
  { Icon: Lock, bg: "oklch(0.52 0.13 305)", title: "SSL Certificates", desc: "Free SSL encryption to secure your website and boost SEO rankings." },
  { Icon: Mail, bg: "oklch(0.82 0.13 85)", title: "Business Emails", desc: "Professional email addresses on your own domain." },
  { Icon: ShieldCheck, bg: "oklch(0.62 0.1 195)", title: "Security", desc: "Regular security updates, malware scanning and firewall protection." },
  { Icon: RefreshCw, bg: "oklch(0.67 0.16 45)", title: "Backups", desc: "Automated daily backups to keep your data safe and recoverable." },
];

function HostingInfoPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.52 0.13 305), transparent 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Hosting</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Hosting & <span className="ice-gradient-text">Domains</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Fast, secure and reliable hosting for your business — with your domain, SSL and emails sorted.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hostingFeatures.map((f) => (
            <div key={f.title} className="glass-card-hover p-8 text-center">
              <div className="icon-blob mx-auto mb-4 h-14 w-14 text-white" style={{ background: f.bg }}>
                <f.Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!bg-surface">
        <div className="cta-navy p-12 text-center md:p-20">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Need Custom Hosting?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75">
            For special requirements like dedicated servers or custom configurations, contact us for a tailored hosting solution.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn-gold text-base no-underline">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-xs text-navy-foreground/60">
            * Other domain extensions (.com, .org, .net etc.) are subject to separate pricing.
          </p>
        </div>
      </Section>
    </>
  );
}
