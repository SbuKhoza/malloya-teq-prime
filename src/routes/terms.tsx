import { createFileRoute } from "@tanstack/react-router";
import { Section } from "../components/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Malloya Teq" },
      { name: "description", content: "Terms and conditions for using Malloya Teq's services." },
      { property: "og:title", content: "Terms of Service — Malloya Teq" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Terms of <span className="gold-gradient-text">Service</span>
          </h1>
          <p className="mt-4 text-muted-foreground">Last updated: April 2026</p>
        </div>
      </section>
      <Section>
        <div className="prose-invert mx-auto max-w-3xl space-y-8">
          {[
            { title: "1. Services", content: "Malloya Teq provides website development, mobile app development, software systems, hosting and related digital services. All work is subject to these terms unless a separate written agreement exists." },
            { title: "2. Payments", content: "All prices are quoted in South African Rand (ZAR). Invoices must be paid within 7 days unless otherwise agreed. We reserve the right to pause or cancel services for overdue accounts." },
            { title: "3. Intellectual Property", content: "Upon full payment, clients receive ownership of the final deliverables. Malloya Teq retains the right to showcase work in our portfolio unless otherwise agreed in writing." },
            { title: "4. Revisions", content: "Each package includes a specified number of revision rounds. Additional revisions may incur extra charges at our standard hourly rate." },
            { title: "5. Hosting & Domains", content: "Free hosting and domain registration included with packages are valid for the duration of the active subscription. Cancellation may result in loss of hosting and domain services." },
            { title: "6. Limitation of Liability", content: "Malloya Teq is not liable for any indirect, incidental, or consequential damages arising from the use of our services or delivered products." },
            { title: "7. Contact", content: "For questions about these terms, please contact us at info@malloyateq.co.za." },
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
