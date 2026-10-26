import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";
import { Switch } from "./ui/switch";
import {
  acceptAll,
  getConsent,
  OPEN_PREFERENCES_EVENT,
  rejectOptional,
  saveConsent,
} from "../lib/consent";

interface Draft {
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

const OPTIONAL_CATEGORIES: {
  key: keyof Draft;
  title: string;
  description: string;
}[] = [
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Helps us count daily visitors and see which country and province they visit from. A small marker with today's date stops you being counted twice in one day. Your IP address is sent to a location service to work out your region and is not stored by us.",
  },
  {
    key: "preferences",
    title: "Preferences",
    description:
      "Lets the site remember choices you make. We don't set any preference cookies at the moment; this switch covers any we add later.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Used to show relevant offers or measure campaigns. We don't use any marketing cookies at the moment; this switch covers any we add later.",
  },
];

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [draft, setDraft] = useState<Draft>({
    analytics: false,
    preferences: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = getConsent();
    if (existing) {
      setDraft({
        analytics: existing.analytics,
        preferences: existing.preferences,
        marketing: existing.marketing,
      });
    } else {
      setShowBanner(true);
    }
    setReady(true);

    const open = () => {
      const current = getConsent();
      setDraft({
        analytics: current?.analytics ?? false,
        preferences: current?.preferences ?? false,
        marketing: current?.marketing ?? false,
      });
      setShowPrefs(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  useEffect(() => {
    if (!showPrefs) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPrefs(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPrefs]);

  if (!ready) return null;

  const close = () => {
    setShowBanner(false);
    setShowPrefs(false);
  };

  const onAcceptAll = () => {
    acceptAll();
    setDraft({ analytics: true, preferences: true, marketing: true });
    close();
  };

  const onNecessaryOnly = () => {
    rejectOptional();
    setDraft({ analytics: false, preferences: false, marketing: false });
    close();
  };

  const onSaveChoices = () => {
    saveConsent(draft);
    close();
  };

  return (
    <>
      {showBanner && !showPrefs && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="glass-card fixed bottom-4 left-4 right-4 z-[60] p-5 sm:right-auto sm:max-w-md md:bottom-6 md:left-6"
          style={{ background: "oklch(1 0 0 / 94%)" }}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-white">
              <Cookie className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-base font-bold text-foreground">
                We value your privacy
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                We always use the cookies the site needs to work (like remembering this choice).
                With your permission we'd also like to count visitors and the regions they come
                from, so we can improve the site. Read our{" "}
                <Link to="/privacy" className="font-semibold text-primary underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onAcceptAll}
              className="btn-gold flex-1 !px-4 !py-2 text-xs"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={onNecessaryOnly}
              className="btn-outline-gold flex-1 !px-4 !py-2 text-xs"
            >
              Necessary only
            </button>
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="rounded-full px-3 py-2 text-xs font-bold text-primary underline-offset-2 hover:underline"
            >
              Customise
            </button>
          </div>
        </div>
      )}

      {showPrefs && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setShowPrefs(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPrefs(false)}
              aria-label="Close cookie preferences"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <h2
              id="cookie-prefs-title"
              className="font-display text-xl font-bold text-foreground"
            >
              Cookie preferences
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Choose which optional cookies we may use. You can change your mind at any time from
              “Cookie Settings” in the footer.
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-border bg-muted/50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-foreground">Strictly necessary</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                    Always on
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Needed for the site to work and to remember your cookie choice (the{" "}
                  <code>mt_consent</code> cookie, kept for 180 days). We also count page views as a
                  simple anonymous total that uses no cookie, no identifier and no personal data.
                  These can't be switched off.
                </p>
              </div>

              {OPTIONAL_CATEGORIES.map((cat) => (
                <div key={cat.key} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-bold text-foreground">{cat.title}</h3>
                    <Switch
                      checked={draft[cat.key]}
                      onCheckedChange={(v) => setDraft((d) => ({ ...d, [cat.key]: v }))}
                      aria-label={`Allow ${cat.title.toLowerCase()} cookies`}
                    />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onSaveChoices}
                className="btn-gold flex-1 !px-4 !py-2.5 text-xs"
              >
                Save my choices
              </button>
              <button
                type="button"
                onClick={onAcceptAll}
                className="btn-outline-gold flex-1 !px-4 !py-2.5 text-xs"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={onNecessaryOnly}
                className="btn-outline-gold flex-1 !px-4 !py-2.5 text-xs"
              >
                Necessary only
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}