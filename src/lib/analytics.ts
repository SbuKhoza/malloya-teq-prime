/**
 * Privacy-friendly visitor analytics, stored as ONE small Firestore document
 * per day (collection `analytics_daily`, doc id = YYYY-MM-DD, South African time).
 *
 * What is collected
 * -----------------
 * Always (no cookie, no storage, no identifier, no IP stored):
 *   - pageViews        total page views that day
 *   - anonymousViews   page views from visitors who have not accepted analytics
 *
 * Only after the visitor accepts the "Analytics" category:
 *   - visitors         unique visitors that day (a browser is counted once per
 *                      day using a `mt_vd` marker holding today's date – there
 *                      is no visitor ID and nothing links one day to the next)
 *   - countries        { ZA: 12, ... }
 *   - regions          { "ZA__Gauteng": 7, ... }
 *
 * The visitor's IP address is sent to a geolocation service ONLY to work out
 * their country/province, once per day, and is never saved by us.
 */
import { doc, getDocs, increment, serverTimestamp, setDoc, collection, query, where, orderBy, limit } from "firebase/firestore";
import { getDb } from "./firebase";
import { getConsent } from "./consent";

export const ANALYTICS_COLLECTION = "analytics_daily";
const VISITOR_MARKER_KEY = "mt_vd";
const SEP = "__";

export interface DailyStats {
  /** YYYY-MM-DD */
  date: string;
  pageViews: number;
  anonymousViews: number;
  visitors: number;
  countries: Record<string, number>;
  regions: Record<string, number>;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Today's date in South Africa (SAST) as YYYY-MM-DD. */
export function dayKey(d: Date = new Date()): string {
  return d.toLocaleDateString("en-CA", { timeZone: "Africa/Johannesburg" });
}

function cleanKey(input: string, fallback: string): string {
  const cleaned = (input || "")
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9 _-]/g, "")
    .trim()
    .slice(0, 60);
  return cleaned || fallback;
}

export const regionKey = (country: string, region: string) =>
  `${country}${SEP}${region}`;

export function splitRegionKey(key: string): { country: string; region: string } {
  const [country, ...rest] = key.split(SEP);
  return { country, region: rest.join(SEP) || "Unknown" };
}

interface GeoResult {
  country: string; // ISO-3166 alpha-2, e.g. "ZA"
  region: string; // e.g. "Gauteng"
}

async function fetchJson(url: string, timeoutMs = 4000): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, credentials: "omit" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/** Country + province from the visitor's IP. Tries two free services. */
async function lookupGeo(): Promise<GeoResult> {
  const unknown: GeoResult = { country: "XX", region: "Unknown" };
  try {
    const a = await fetchJson("https://ipwho.is/?fields=success,country_code,region");
    if (a?.success !== false && a?.country_code) {
      return {
        country: cleanKey(String(a.country_code).toUpperCase(), "XX").slice(0, 2),
        region: cleanKey(a.region, "Unknown"),
      };
    }
  } catch {
    /* fall through to backup service */
  }
  try {
    const b = await fetchJson("https://ipapi.co/json/");
    if (b?.country_code) {
      return {
        country: cleanKey(String(b.country_code).toUpperCase(), "XX").slice(0, 2),
        region: cleanKey(b.region, "Unknown"),
      };
    }
  } catch {
    /* give up – count the visit without a location */
  }
  return unknown;
}

/* ------------------------------------------------------------------ */
/* Tracking                                                           */
/* ------------------------------------------------------------------ */

/**
 * Call once per page view (route change). Never throws.
 * Pass `{ countPageView: false }` when a visitor has just accepted analytics and
 * we only need to record their unique visit/region (the view was already counted).
 */
export async function trackPageView(
  opts: { countPageView?: boolean } = {},
): Promise<void> {
  const { countPageView = true } = opts;
  if (typeof window === "undefined") return;
  try {
    const consent = getConsent();
    const analyticsOk = consent?.analytics === true;
    const today = dayKey();
    const ref = doc(getDb(), ANALYTICS_COLLECTION, today);

    // 1) Anonymous aggregate counter – no storage, no identifier.
    if (countPageView) {
      await setDoc(
        ref,
        {
          date: today,
          pageViews: increment(1),
          anonymousViews: increment(analyticsOk ? 0 : 1),
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }

    // 2) Unique visitor + region – ONLY with analytics consent, once per day.
    if (!analyticsOk) return;
    let lastCounted: string | null = null;
    try {
      lastCounted = window.localStorage.getItem(VISITOR_MARKER_KEY);
    } catch {
      /* storage blocked – skip unique counting rather than over-count */
      return;
    }
    if (lastCounted === today) return;

    // Mark first so parallel tabs / fast navigation don't double count.
    window.localStorage.setItem(VISITOR_MARKER_KEY, today);

    const geo = await lookupGeo();
    await setDoc(
      ref,
      {
        date: today,
        visitors: increment(1),
        countries: { [geo.country]: increment(1) },
        regions: { [regionKey(geo.country, geo.region)]: increment(1) },
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (e) {
    // Analytics must never break the website.
    console.debug("[analytics] skipped:", e);
  }
}

/* ------------------------------------------------------------------ */
/* Reading (admin only – protected by Firestore rules)                */
/* ------------------------------------------------------------------ */

function toNumber(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : 0;
}

function toCounts(v: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (v && typeof v === "object") {
    for (const [k, n] of Object.entries(v as Record<string, unknown>)) {
      out[k] = toNumber(n);
    }
  }
  return out;
}

/** Loads daily stats for the last `days` days (including today), oldest first. */
export async function loadDailyStats(days: number): Promise<DailyStats[]> {
  const from = new Date();
  from.setDate(from.getDate() - (days - 1));
  const snap = await getDocs(
    query(
      collection(getDb(), ANALYTICS_COLLECTION),
      where("date", ">=", dayKey(from)),
      orderBy("date", "asc"),
      limit(400),
    ),
  );
  return snap.docs.map((d) => {
    const x = d.data();
    return {
      date: String(x.date ?? d.id),
      pageViews: toNumber(x.pageViews),
      anonymousViews: toNumber(x.anonymousViews),
      visitors: toNumber(x.visitors),
      countries: toCounts(x.countries),
      regions: toCounts(x.regions),
    };
  });
}