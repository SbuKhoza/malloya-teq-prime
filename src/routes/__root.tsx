import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { CookieConsent } from "../components/CookieConsent";
import { AnalyticsTracker } from "../components/AnalyticsTracker";
import { AuthProvider } from "../lib/auth-context";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold gold-gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Haibo — page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-gold inline-block text-sm no-underline">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Malloya Teq — Building Tech, the Kasi Way" },
      { name: "description", content: "South African software & automation studio. Websites, mobile apps, automation, hosting, UX/UI design and e-commerce — proudly born ekasi." },
      { name: "author", content: "Malloya Teq" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Malloya Teq — Building Tech, the Kasi Way" },
      { name: "twitter:title", content: "Malloya Teq — Building Tech, the Kasi Way" },
      { property: "og:description", content: "Websites, mobile apps, automation and design — proudly born ekasi, built for businesses everywhere." },
      { name: "twitter:description", content: "Websites, mobile apps, automation and design — proudly born ekasi, built for businesses everywhere." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/83ad3a5b-efe8-441a-a877-38b128a2def5/id-preview-452a0445--f8e15e81-c53c-4f20-b686-184c2f201e09.lovable.app-1776486969063.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/83ad3a5b-efe8-441a-a877-38b128a2def5/id-preview-452a0445--f8e15e81-c53c-4f20-b686-184c2f201e09.lovable.app-1776486969063.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // The static SPA build (vite.cpanel.config.ts) mounts into <div id="root">, so it must
  // NOT render <html>/<head>/<body>: React would adopt the real document elements as
  // children of #root and the tab hangs on the first re-render (e.g. typing in an input).
  // Only the server-rendered (TanStack Start) build renders the full document shell.
  if (import.meta.env.VITE_SPA) {
    return (
      <>
        <HeadContent />
        {children}
      </>
    );
  }
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdminArea = pathname.startsWith("/admin");

  return (
    <AuthProvider>
      {isAdminArea ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <main className="pt-24">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
          <AnalyticsTracker />
          <CookieConsent />
        </>
      )}
    </AuthProvider>
  );
}