import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "../components/Section";

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

function ContactPage() {
  return (
    <>
      <section className="px-6 pb-12 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="badge-gold mb-4 inline-block">Contact</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Get in <span className="gold-gradient-text">Touch</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Ready to start your project? We'd love to hear from you.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: "✉️", title: "Email", info: "info@malloyateq.co.za", href: "mailto:info@malloyateq.co.za" },
            { icon: "💬", title: "WhatsApp", info: "Chat with us", href: "https://wa.me/27000000000" },
            { icon: "📍", title: "Location", info: "South Africa", href: "#" },
          ].map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-card-hover block p-8 text-center no-underline"
            >
              <div className="mb-4 text-4xl">{c.icon}</div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.info}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-card glow-gold p-12 text-center md:p-20">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Prefer a Detailed Quote?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Use our quote form to give us all the details about your project.
          </p>
          <div className="mt-8">
            <Link to="/quote" className="btn-gold inline-block text-base no-underline">
              Request Quote
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
