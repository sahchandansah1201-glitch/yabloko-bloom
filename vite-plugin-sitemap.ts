import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

const DOMAIN = "https://yabloko-clinic.ru";

interface StaticRoute {
  path: string;
  changefreq: string;
  priority: number;
}

const staticRoutes: StaticRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/specialists", changefreq: "monthly", priority: 0.8 },
  { path: "/services", changefreq: "monthly", priority: 0.8 },
  { path: "/advice", changefreq: "weekly", priority: 0.7 },
  { path: "/about", changefreq: "monthly", priority: 0.6 },
  { path: "/contacts", changefreq: "monthly", priority: 0.6 },
  { path: "/price", changefreq: "monthly", priority: 0.7 },
  { path: "/patients", changefreq: "monthly", priority: 0.5 },
  { path: "/privacy", changefreq: "yearly", priority: 0.3 },
  { path: "/doctor/pavlyuk", changefreq: "monthly", priority: 0.9 },
];

function extractSlugs(content: string, prefix: string): string[] {
  const slugs = new Set<string>();
  const regex = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  return [...slugs].map((s) => `${prefix}/${s}`);
}

function extractDoctorProfileKeys(content: string): string[] {
  const keys: string[] = [];
  const regex = /^\s+"([a-z][\w-]+)":\s*\{/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.push(`/doctor/${match[1]}`);
  }
  return keys;
}

function buildUrl(loc: string, changefreq: string, priority: number, lastmod: string): string {
  return `  <url><loc>${DOMAIN}${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority.toFixed(1)}</priority></url>`;
}

export function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const srcDir = path.resolve(__dirname, "src/data");

      // Read data files
      const servicesContent = fs.readFileSync(path.join(srcDir, "servicesData.ts"), "utf-8");
      const articlesContent = fs.readFileSync(path.join(srcDir, "articlesData.ts"), "utf-8");
      const doctorsContent = fs.readFileSync(path.join(srcDir, "doctorProfiles.ts"), "utf-8");

      const servicePaths = extractSlugs(servicesContent, "/services");
      const articlePaths = extractSlugs(articlesContent, "/advice");
      const doctorPaths = extractDoctorProfileKeys(doctorsContent);

      const urls: string[] = [];

      // Static routes
      for (const r of staticRoutes) {
        urls.push(buildUrl(r.path, r.changefreq, r.priority, today));
      }

      // Doctor profile pages
      for (const p of doctorPaths) {
        urls.push(buildUrl(p, "monthly", 0.7, today));
      }

      // Service pages
      for (const p of servicePaths) {
        urls.push(buildUrl(p, "monthly", 0.7, today));
      }

      // Article pages
      for (const p of articlePaths) {
        urls.push(buildUrl(p, "yearly", 0.6, today));
      }

      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        "</urlset>",
        "",
      ].join("\n");

      const outPath = path.resolve(__dirname, "dist/sitemap.xml");
      fs.writeFileSync(outPath, xml, "utf-8");
      console.log(`✅ sitemap.xml generated with ${urls.length} URLs`);
    },
  };
}
