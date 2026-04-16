import { createFileRoute } from "@tanstack/react-router";
import { Section } from "../components/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Malloya Teq" },
      { name: "description", content: "How Malloya Teq collects, uses and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Malloya Teq" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Privacy <span className="gold-gradient-text">Policy</span>
          </h1>
          <p className="mt-4 text-muted-foreground">Last updated: April 2026</p>
        </div>
      </section>
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          {[
            { title: "Information We Collect", content: "We collect information you provide directly, such as your name, email, phone number and project details when you request a quote or contact us." },
            { title: "How We Use Information", content: "Your information is used to respond to enquiries, provide our services, send project updates, and improve our offerings. We never sell your data to third parties." },
            { title: "Data Security", content: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, or destruction." },
            { title: "Cookies", content: "Our website may use cookies to enhance your browsing experience. You can disable cookies in your browser settings at any time." },
            { title: "Your Rights", content: "Under POPIA (Protection of Personal Information Act), you have the right to access, correct, or delete your personal information. Contact us to exercise these rights." },
            { title: "Contact", content: "For privacy-related enquiries, email us at info@malloyateq.co.za." },
          ].map((s) => (
            <div key={s.title} className="glass-card p-8">
              <h2 className="mb-3 text-xl font-bold text-foreground">{s.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.content}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
