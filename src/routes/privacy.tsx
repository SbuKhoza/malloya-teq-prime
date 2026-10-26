import { createFileRoute } from "@tanstack/react-router";
import { Section } from "../components/Section";
import { openCookiePreferences } from "../lib/consent";

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
          <p className="mt-4 text-muted-foreground">Last updated: October 2026</p>
        </div>
      </section>
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          {[
            { title: "Information We Collect", content: "We collect information you provide directly, such as your name, email, phone number and project details when you request a quote or contact us." },
            { title: "How We Use Information", content: "Your information is used to respond to enquiries, provide our services, send project updates, and improve our offerings. We never sell your data to third parties." },
            { title: "Data Security", content: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, or destruction." },
            { title: "Your Rights", content: "Under POPIA (Protection of Personal Information Act), you have the right to access, correct, or delete your personal information. Contact us to exercise these rights." },
            { title: "Contact", content: "For privacy-related enquiries, email us at info@malloyateq.co.za." },
          ].map((s) => (
            <div key={s.title} className="glass-card p-8">
              <h2 className="mb-3 text-xl font-bold text-foreground">{s.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.content}</p>
            </div>
          ))}

          <div id="cookies" className="glass-card p-8">
            <h2 className="mb-3 text-xl font-bold text-foreground">Cookies &amp; Visitor Statistics</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              When you first visit, we show a cookie notice. Strictly necessary cookies are always
              on. Everything else is optional and stays off until you say yes. You can change your
              choice at any time.
            </p>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="font-bold text-foreground">Strictly necessary (always on)</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>
                    <code>mt_consent</code> — a first-party cookie that remembers your cookie
                    choice. Kept for 180 days.
                  </li>
                  <li>
                    Staff sign-in session — only used when our team signs in to the admin area.
                  </li>
                  <li>
                    An anonymous page-view total — we add 1 to a daily counter. It uses no cookie,
                    no identifier and no personal information.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Analytics (optional)</h3>
                <p className="mt-1">
                  If you allow this, we count you once per day as a visitor and record your country
                  and province. We store a small marker (<code>mt_vd</code>) in your browser holding
                  the date you were last counted, so you are not counted twice in one day. It
                  contains no ID and cannot be used to follow you from one day to the next. To work
                  out your location, your IP address is sent once a day to a third-party
                  geolocation service (ipwho.is, or ipapi.co as a backup). We do not store your IP
                  address. We only keep daily totals, for example “12 visitors from Gauteng”.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Preferences and marketing (optional)</h3>
                <p className="mt-1">
                  We do not currently use preference or marketing cookies. If we ever add them, they
                  will stay off unless you allow them.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Fonts</h3>
                <p className="mt-1">
                  Our fonts load from Google Fonts, which means your browser contacts Google when a
                  page loads.
                </p>
              </div>
            </div>
            <button type="button" onClick={openCookiePreferences} className="btn-gold mt-6 text-sm">
              Change my cookie choices
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}