/**
 * Cookie / storage consent for Malloya Teq.
 *
 * - "necessary" is ALWAYS on (stores the visitor's own consent choice, and the
 *   admin sign-in session for staff). These are exempt from consent.
 * - Every other category is OPT-IN and stays off until the visitor says yes.
 *
 * The visitor's choice is saved in a first-party cookie called `mt_consent`
 * for 180 days, after which we ask again.
 */

export type ConsentCategory = "analytics" | "preferences" | "marketing";

export interface ConsentState {
  /** Schema version – bump to force everyone to re-consent. */
  v: 1;
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
  /** ISO timestamp of when the choice was made. */
  ts: string;
}

export const CONSENT_COOKIE = "mt_consent";
export const CONSENT_MAX_AGE_DAYS = 180;
export const CONSENT_EVENT = "mt:consent-changed";
export const OPEN_PREFERENCES_EVENT = "mt:open-cookie-preferences";

/** Storage keys that only exist when the visitor has accepted analytics. */
export const ANALYTICS_STORAGE_KEYS = ["mt_vd"] as const;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string, days: number): void {
  if (!isBrowser()) return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${
    days * 24 * 60 * 60
  }; Path=/; SameSite=Lax${secure}`;
}

export function getConsent(): ConsentState | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.v !== 1) return null;
    return {
      v: 1,
      necessary: true,
      analytics: parsed.analytics === true,
      preferences: parsed.preferences === true,
      marketing: parsed.marketing === true,
      ts: typeof parsed.ts === "string" ? parsed.ts : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/** Remove anything we stored for categories the visitor has NOT allowed. */
function purgeDisallowed(state: ConsentState): void {
  if (!isBrowser()) return;
  if (!state.analytics) {
    for (const key of ANALYTICS_STORAGE_KEYS) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* storage unavailable – nothing to remove */
      }
    }
  }
}

export function saveConsent(
  choice: Pick<ConsentState, "analytics" | "preferences" | "marketing">,
): ConsentState {
  const state: ConsentState = {
    v: 1,
    necessary: true,
    analytics: choice.analytics,
    preferences: choice.preferences,
    marketing: choice.marketing,
    ts: new Date().toISOString(),
  };
  writeCookie(CONSENT_COOKIE, JSON.stringify(state), CONSENT_MAX_AGE_DAYS);
  purgeDisallowed(state);
  if (isBrowser()) {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  }
  return state;
}

export const acceptAll = () =>
  saveConsent({ analytics: true, preferences: true, marketing: true });

export const rejectOptional = () =>
  saveConsent({ analytics: false, preferences: false, marketing: false });

export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()?.[category] === true;
}

/** Lets any link/button (e.g. the footer) re-open the preferences panel. */
export function openCookiePreferences(): void {
  if (isBrowser()) window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}