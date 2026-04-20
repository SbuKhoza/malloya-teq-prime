import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Section } from "../components/Section";
import { useContent } from "../lib/use-content";
import { submitQuote } from "../lib/content-service";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — Malloya Teq" },
      { name: "description", content: "Get a free quote for your website, app or software project. Fill in the form and we'll get back to you." },
      { property: "og:title", content: "Request a Quote — Malloya Teq" },
      { property: "og:description", content: "Get a free quote for your website, app or software project." },
    ],
  }),
  component: QuotePage,
});

const serviceTypes = [
  "Website Development",
  "Mobile App Development",
  "Software Systems",
  "Hosting & Domains",
] as const;

const allPackages = [...websitePackages, ...appPackages];

function QuotePage() {
  const { copy, websitePackages, appPackages } = useContent();
  const allPackages = [...websitePackages, ...appPackages];
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    packageName: "",
    billingCycle: "monthly",
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitQuote(form);
      setSubmitted(true);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card glow-gold mx-auto max-w-lg p-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Thank You!</h2>
          <p className="mt-3 text-muted-foreground">
            Malloya Teq will contact you soon. We typically respond within 24 hours.
          </p>
          <Link to="/" className="btn-gold mt-8 inline-block text-sm no-underline">
            Back to Home
          </Link>
        </motion.div>
      </Section>
    );
  }

  return (
    <>
      <section className="px-6 pb-8 pt-12 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-gold mb-4 inline-block">Get Started</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Request a <span className="gold-gradient-text">Quote</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tell us about your project and we'll get back to you with a custom proposal.
          </p>
        </div>
      </section>

      <Section>
        {/* Progress */}
        <div className="mx-auto mb-12 flex max-w-md items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div className={`mx-2 h-0.5 w-12 transition-colors md:w-20 ${s < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 md:p-12"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Service Details</h3>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Service Type</label>
                    <select
                      value={form.serviceType}
                      onChange={(e) => update("serviceType", e.target.value)}
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Package</label>
                    <select
                      value={form.packageName}
                      onChange={(e) => update("packageName", e.target.value)}
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    >
                      <option value="">Select a package</option>
                      {allPackages.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Billing Cycle</label>
                    <div className="flex gap-4">
                      {["monthly", "annual"].map((c) => (
                        <button
                          key={c}
                          onClick={() => update("billingCycle", c)}
                          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                            form.billingCycle === c
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Your Details</h3>
                  {[
                    { field: "fullName", label: "Full Name", type: "text" },
                    { field: "companyName", label: "Company Name", type: "text" },
                    { field: "email", label: "Email", type: "email" },
                    { field: "phone", label: "Phone Number", type: "tel" },
                  ].map((f) => (
                    <div key={f.field}>
                      <label className="mb-2 block text-sm font-medium text-foreground">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.field as keyof typeof form]}
                        onChange={(e) => update(f.field, e.target.value)}
                        className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                        placeholder={f.label}
                      />
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Project Details</h3>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Project Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                      placeholder="Describe your project..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Budget (ZAR)</label>
                    <input
                      type="text"
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                      placeholder="e.g. R5,000 - R10,000"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Deadline</label>
                    <input
                      type="text"
                      value={form.deadline}
                      onChange={(e) => update("deadline", e.target.value)}
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                      placeholder="e.g. 2 weeks, 1 month"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Review & Submit</h3>
                  <div className="space-y-4 rounded-xl bg-muted/50 p-6">
                    {[
                      { label: "Service", value: form.serviceType },
                      { label: "Package", value: form.packageName },
                      { label: "Billing", value: form.billingCycle },
                      { label: "Name", value: form.fullName },
                      { label: "Company", value: form.companyName },
                      { label: "Email", value: form.email },
                      { label: "Phone", value: form.phone },
                      { label: "Budget", value: form.budget },
                      { label: "Deadline", value: form.deadline },
                    ]
                      .filter((r) => r.value)
                      .map((r) => (
                        <div key={r.label} className="flex justify-between border-b border-border pb-2 last:border-0">
                          <span className="text-sm text-muted-foreground">{r.label}</span>
                          <span className="text-sm font-medium text-foreground">{r.value}</span>
                        </div>
                      ))}
                    {form.description && (
                      <div className="pt-2">
                        <span className="text-sm text-muted-foreground">Description</span>
                        <p className="mt-1 text-sm text-foreground">{form.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                  <button onClick={prev} className="btn-outline-gold text-sm">
                    Back
                  </button>
                ) : (
                  <div />
                )}
                {step < 4 ? (
                  <button onClick={next} className="btn-gold text-sm">
                    Continue
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="btn-gold text-sm">
                    Submit Quote
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>
    </>
  );
}
