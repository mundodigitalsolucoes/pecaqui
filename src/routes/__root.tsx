import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PeçAqui Auto Peças | 38 anos de tradição em São José do Rio Preto" },
      {
        name: "description",
        content:
          "PeçAqui Auto Peças em São José do Rio Preto. Há 38 anos oferecendo autopeças, acessórios, lubrificantes e troca de óleo com atendimento especializado e as melhores marcas do mercado.",
      },
      {
        name: "keywords",
        content:
          "autopeças São José do Rio Preto, auto peças Rio Preto, troca de óleo São José do Rio Preto, lubrificantes automotivos, peças automotivas, acessórios automotivos, autopeças perto de mim",
      },
      { name: "author", content: "PeçAqui Auto Peças" },
      { property: "og:title", content: "PeçAqui Auto Peças | 38 anos de tradição em São José do Rio Preto" },
      {
        property: "og:description",
        content:
          "PeçAqui Auto Peças em São José do Rio Preto. Há 38 anos oferecendo autopeças, acessórios, lubrificantes e troca de óleo com atendimento especializado e as melhores marcas do mercado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "PeçAqui Auto Peças" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "PeçAqui Auto Peças | 38 anos de tradição em São José do Rio Preto" },
      {
        name: "twitter:description",
        content:
          "Autopeças, acessórios, lubrificantes e troca de óleo com atendimento especializado em São José do Rio Preto.",
      },
    ],
    links: [
      {
        rel: "preload",
        href: "/node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "WebSite"],
          name: "PeçAqui Auto Peças",
          url: "/",
          sameAs: [
            "https://www.instagram.com/auto.pecas.pecaqui/",
            "https://www.facebook.com/autopecas.pecaqui",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
