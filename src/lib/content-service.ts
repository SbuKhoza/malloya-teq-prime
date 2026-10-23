import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { getDb } from "./firebase";
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
  phoneDisplay: string;
  location: string;
  contactCtaTitle: string;
  contactCtaSubtitle: string;
  faqHeroTitle: string;
  faqHeroBadge: string;
  quoteHeroTitle: string;
  quoteHeroBadge: string;
  quoteHeroSubtitle: string;
}

export const defaultPageCopy: PageCopy = {
  homeHeroBadge: "Software & Automation Studio",
  homeHeroTitle: "Building Tech, the Kasi Way.",
  homeHeroSubtitle:
    "Websites, mobile apps, automation and design — proudly born ekasi, built for businesses everywhere.",
  servicesHeroTitle: "What We Build",
  servicesHeroSubtitle:
    "Modern, responsive and user-friendly digital products — from websites and apps to automation that saves you time.",
  contactHeroTitle: "Get in Touch",
  contactHeroSubtitle: "Ready to start your project? We'd love to hear from you.",
  contactEmail: "info@malloyagroup.co.za",
  whatsappNumber: "27682602439",
  phoneDisplay: "068 260 2439",
  location: "Johannesburg, South Africa",
  contactCtaTitle: "Prefer a Detailed Quote?",
  contactCtaSubtitle: "Use our quote form to give us all the details about your project.",
  faqHeroTitle: "Frequently Asked Questions",
  faqHeroBadge: "FAQ",
  quoteHeroTitle: "Request a Quote",
  quoteHeroBadge: "Get Started",
  quoteHeroSubtitle:
    "Tell us about your project and we'll get back to you with a custom proposal.",
};

export interface FAQItem {
  q: string;
  a: string;
}

export const defaultFaqs: FAQItem[] = [
  { q: "How long does it take to build a website?", a: "Depending on complexity, static websites take 1-2 weeks, dynamic sites 2-4 weeks, and e-commerce stores 3-6 weeks. We'll give you an accurate timeline during the quote process." },
  { q: "Do you offer ongoing support after launch?", a: "Yes! All our projects include initial support, and we offer affordable maintenance plans for ongoing updates, backups, and security monitoring." },
  { q: "Can I update my website myself?", a: "We can build your site on a content management system with an admin dashboard where you can easily update content, add blog posts, and manage your site without any coding knowledge." },
  { q: "What payment methods do you accept?", a: "We accept EFT, bank transfers, and various online payment methods. We offer flexible payment plans for larger projects." },
  { q: "Do you work with businesses outside South Africa?", a: "Absolutely! While we're proudly born ekasi, we work with businesses worldwide. Our pricing is in ZAR but we can provide quotes in other currencies." },
  { q: "What's included with hosting?", a: "Our hosting covers fast, secure and reliable hosting for your business, and we can bundle a .co.za domain, SSL and professional email addresses with your project." },
  { q: "Can you build a mobile app for both Android and iOS?", a: "Yes! We build native Android and iOS apps, as well as cross-platform apps that work on both systems from a single codebase." },
  { q: "What if I need something custom?", a: "No problem — we specialize in custom solutions. Request a quote and describe your requirements. We'll create a tailored proposal for your project." },
];

export interface ContentDoc {
  portfolio: PortfolioItem[];
  reviews: Review[];
  copy: PageCopy;
  faqs: FAQItem[];
}

export const defaultContent: ContentDoc = {
  portfolio: portfolioItems,
  reviews,
  copy: defaultPageCopy,
  faqs: defaultFaqs,
};

const CONTENT_DOC = ["content", "site"] as const;

function mergeContent(data: Partial<ContentDoc>): ContentDoc {
  return {
    portfolio: data.portfolio ?? defaultContent.portfolio,
    reviews: data.reviews ?? defaultContent.reviews,
    // Stored copy saved before the redesign (no phoneDisplay field) is stale — use fresh brand copy.
    copy:
      data.copy && typeof data.copy.phoneDisplay === "string"
        ? { ...defaultPageCopy, ...data.copy }
        : defaultPageCopy,
    faqs: data.faqs ?? defaultContent.faqs,
  };
}

export async function loadContent(): Promise<ContentDoc> {
  try {
    const snap = await getDoc(doc(getDb(), CONTENT_DOC[0], CONTENT_DOC[1]));
    if (!snap.exists()) return defaultContent;
    return mergeContent(snap.data() as Partial<ContentDoc>);
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
        cb(mergeContent(snap.data() as Partial<ContentDoc>));
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

/* ---------- Quotes ---------- */

export interface QuoteSubmission {
  id?: string;
  serviceType: string;
  packageName?: string;
  billingCycle?: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  description: string;
  budget: string;
  deadline: string;
  createdAt?: number;
}

export async function submitQuote(q: Omit<QuoteSubmission, "id" | "createdAt">): Promise<void> {
  await addDoc(collection(getDb(), "quotes"), {
    ...q,
    createdAt: serverTimestamp(),
  });
}

export async function loadQuotes(): Promise<QuoteSubmission[]> {
  const snap = await getDocs(query(collection(getDb(), "quotes"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => {
    const data = d.data() as Record<string, unknown>;
    const ts = data.createdAt as { toMillis?: () => number } | undefined;
    return {
      id: d.id,
      serviceType: String(data.serviceType ?? ""),
      packageName: String(data.packageName ?? ""),
      billingCycle: String(data.billingCycle ?? ""),
      fullName: String(data.fullName ?? ""),
      companyName: String(data.companyName ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phone ?? ""),
      description: String(data.description ?? ""),
      budget: String(data.budget ?? ""),
      deadline: String(data.deadline ?? ""),
      createdAt: ts?.toMillis ? ts.toMillis() : undefined,
    };
  });
}

export async function deleteQuote(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), "quotes", id));
}
