import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { getDb } from "./firebase";
import { websitePackages, appPackages, includedBenefits, type Package } from "../data/packages";
import { portfolioItems, type PortfolioItem } from "../data/portfolio";
import { reviews, type Review } from "../data/reviews";

export interface PageCopy {
  homeHeroBadge: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  servicesHeroTitle: string;
  servicesHeroSubtitle: string;
  contactHeroTitle: string;
  contactHeroSubtitle: string;
  contactEmail: string;
  whatsappNumber: string;
  location: string;
}

export const defaultPageCopy: PageCopy = {
  homeHeroBadge: "South Africa's Premium Tech Partner",
  homeHeroTitle: "Websites, Apps & Smart Business Systems",
  homeHeroSubtitle:
    "Helping businesses grow through websites, mobile apps, automation and custom software.",
  servicesHeroTitle: "Digital Solutions That Drive Growth",
  servicesHeroSubtitle:
    "From concept to launch, we build premium digital products that help South African businesses thrive.",
  contactHeroTitle: "Get in Touch",
  contactHeroSubtitle: "Ready to start your project? We'd love to hear from you.",
  contactEmail: "info@malloyateq.co.za",
  whatsappNumber: "27000000000",
  location: "South Africa",
};

export interface ContentDoc {
  websitePackages: Package[];
  appPackages: Package[];
  includedBenefits: string[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  copy: PageCopy;
}

export const defaultContent: ContentDoc = {
  websitePackages,
  appPackages,
  includedBenefits,
  portfolio: portfolioItems,
  reviews,
  copy: defaultPageCopy,
};

const CONTENT_DOC = ["content", "site"] as const;

export async function loadContent(): Promise<ContentDoc> {
  try {
    const snap = await getDoc(doc(getDb(), CONTENT_DOC[0], CONTENT_DOC[1]));
    if (!snap.exists()) return defaultContent;
    const data = snap.data() as Partial<ContentDoc>;
    return {
      websitePackages: data.websitePackages ?? defaultContent.websitePackages,
      appPackages: data.appPackages ?? defaultContent.appPackages,
      includedBenefits: data.includedBenefits ?? defaultContent.includedBenefits,
      portfolio: data.portfolio ?? defaultContent.portfolio,
      reviews: data.reviews ?? defaultContent.reviews,
      copy: { ...defaultContent.copy, ...(data.copy ?? {}) },
    };
  } catch (e) {
    console.warn("[content] falling back to defaults:", e);
    return defaultContent;
  }
}

export function subscribeContent(cb: (c: ContentDoc) => void) {
  try {
    return onSnapshot(
      doc(getDb(), CONTENT_DOC[0], CONTENT_DOC[1]),
      (snap) => {
        if (!snap.exists()) {
          cb(defaultContent);
          return;
        }
        const data = snap.data() as Partial<ContentDoc>;
        cb({
          websitePackages: data.websitePackages ?? defaultContent.websitePackages,
          appPackages: data.appPackages ?? defaultContent.appPackages,
          includedBenefits: data.includedBenefits ?? defaultContent.includedBenefits,
          portfolio: data.portfolio ?? defaultContent.portfolio,
          reviews: data.reviews ?? defaultContent.reviews,
          copy: { ...defaultContent.copy, ...(data.copy ?? {}) },
        });
      },
      (err) => {
        console.warn("[content] subscribe error:", err);
        cb(defaultContent);
      },
    );
  } catch (e) {
    console.warn("[content] subscribe failed:", e);
    cb(defaultContent);
    return () => {};
  }
}

export async function saveContent(content: ContentDoc): Promise<void> {
  await setDoc(doc(getDb(), CONTENT_DOC[0], CONTENT_DOC[1]), content);
}
