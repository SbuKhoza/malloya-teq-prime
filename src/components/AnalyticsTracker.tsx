import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { trackPageView } from "../lib/analytics";
import { CONSENT_EVENT } from "../lib/consent";

/**
 * Renders nothing. Records one page view per route change on the public site
 * (never in /admin). If a visitor accepts analytics part-way through their
 * visit, their unique visit + region is recorded straight away.
 */
export function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    void trackPageView();
  }, [pathname]);

  useEffect(() => {
    const onConsent = () => {
      if (window.location.pathname.startsWith("/admin")) return;
      void trackPageView({ countPageView: false });
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}