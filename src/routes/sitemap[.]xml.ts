import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_SITE_URL = "https://pecaquiautopecas.com.br";

function getBaseUrl(request: Request) {
  const envSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();
  if (envSiteUrl) {
    return envSiteUrl.replace(/\/$/, "");
  }

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const baseUrl = getBaseUrl(request) || DEFAULT_SITE_URL;
        const lastmod = new Date().toISOString();
        const urls = [
          { loc: `${baseUrl}/`, priority: "1.0", changefreq: "weekly" },
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});