import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeader } from "../components/Section";

export const Route = createFileRoute("/hosting-info")({
  head: () => ({
    meta: [
      { title: "Hosting & Domain Info — Malloya Teq" },
      { name: "description", content: "Learn about our hosting, domain setup, SSL and email services included with every package." },
      { property: "og:title", content: "Hosting & Domain Info — Malloya Teq" },
    ],
  }),
  component: HostingInfoPage,
});

const hostingFeatures = [
  { icon: "🚀", title: "Fast Hosting", desc: "High-performance servers with 99.9% uptime guarantee for your website." },
  { icon: "🌍", title: "Domain Setup", desc: "Free .co.za domain registration with every website package." },
  { icon: "🔒", title: "SSL Certificates", desc: "Free SSL encryption to secure your website and boost SEO rankings." },
  { icon: "✉️", title: "Business Emails", desc: "3 professional email addresses (you@yourdomain.co.za) included." },
  { icon: "🛡️", title: "Security", desc: "Regular security updates, malware scanning and firewall protection." },
  { icon: "🔄", title: "Backups", desc: "Automated daily backups to keep your data safe and recoverable." },
];

function HostingInfoPage() {
  return (
    <>
      <section className="px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="badge-ice mb-4 inline-block">Hosting</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Hosting & <span className="ice-gradient-text">Domains</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Every website package includes premium hosting, a free .co.za domain, and professional email addresses.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hostingFeatures.map((f) => (
            <div key={f.title} className="glass-card-hover p-8 text-center">
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!bg-surface">
        <div className="glass-card glow-ice p-12 text-center md:p-20">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Need Custom Hosting?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            For special requirements like dedicated servers or custom configurations, contact us for a tailored hosting solution.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn-gold inline-block text-base no-underline">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            * Other domain extensions (.com, .org, .net etc.) are subject to separate pricing.
          </p>
        </div>
      </Section>
    </>
  );
}
