import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { Section } from "../components/Section";
import { useContent } from "../lib/use-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Malloya Teq" },
      { name: "description", content: "Get in touch with Malloya Teq. We'd love to hear about your project." },
      { property: "og:title", content: "Contact Us — Malloya Teq" },
      { property: "og:description", content: "Get in touch with Malloya Teq." },
    ],
  }),
  component: ContactPage,
});

const cardColors = [
  "oklch(0.62 0.1 195)",
  "oklch(0.67 0.16 45)",
  "oklch(0.52 0.13 305)",
  "oklch(0.82 0.13 85)",
];

function ContactPage() {
  const { copy } = useContent();
  const cards = [
    { Icon: Mail, title: "Email", info: copy.contactEmail, href: `mailto:${copy.contactEmail}` },
    { Icon: MessageCircle, title: "WhatsApp", info: "Chat with us", href: `https://wa.me/${copy.whatsappNumber}` },
    { Icon: Phone, title: "Call Us", info: copy.phoneDisplay, href: "tel:+27682602439" },
    { Icon: MapPin, title: "Location", info: copy.location, href: "#" },
  ];

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, oklch(0.67 0.16 45), transparent 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Contact</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {copy.contactHeroTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gold-gradient-text">{copy.contactHeroTitle.split(" ").slice(-1)}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {copy.contactHeroSubtitle}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-card-hover block p-8 text-center no-underline"
            >
              <div className="icon-blob mx-auto mb-4 h-14 w-14 text-white" style={{ background: cardColors[i % cardColors.length] }}>
                <c.Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="mb-1 text-lg font-bold text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.info}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <div className="cta-navy p-12 text-center md:p-20">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            {copy.contactCtaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75">
            {copy.contactCtaSubtitle}
          </p>
          <div className="mt-8">
            <Link to="/quote" className="btn-gold text-base no-underline">
              Request Quote
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

