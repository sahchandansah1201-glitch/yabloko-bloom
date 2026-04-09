/**
 * vite-plugin-prerender-meta
 *
 * Build-time plugin that generates lightweight HTML shells for every known
 * route.  Each shell contains the correct <title>, <meta description>,
 * Open Graph tags and JSON-LD – so crawlers that don't execute JS still
 * receive all critical SEO signals.
 *
 * The body remains a single <div id="root"></div> that the SPA hydrates at
 * runtime, keeping the bundle identical to the SPA build.
 */

import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

const DOMAIN = "https://yabloko-clinic.ru";
const CLINIC_NAME = "Клиника «Яблоко»";
const CITY = "Краснодаре";
const CITY_NOM = "Краснодар";
const DEFAULT_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4d5390d9-904f-421d-b5ce-752b09bc7aa4/id-preview-a1c0c64d--a90f24cd-236d-4888-b788-27e2347a039d.lovable.app-1773742924479.png";

// ─── helpers ────────────────────────────────────────────────────────
interface RouteMeta {
  path: string;
  title: string;
  description: string;
  jsonLd?: object;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(
  template: string,
  meta: RouteMeta,
  assets: { css: string[]; js: string[] },
): string {
  const canonical = `${DOMAIN}${meta.path === "/" ? "" : meta.path}`;
  const titleEsc = escapeHtml(meta.title);
  const descEsc = escapeHtml(meta.description);

  let head = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${titleEsc}</title>
    <meta name="description" content="${descEsc}" />
    <link rel="canonical" href="${canonical}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${titleEsc}" />
    <meta property="og:description" content="${descEsc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${DEFAULT_IMAGE}" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:site_name" content="${CLINIC_NAME}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${titleEsc}" />
    <meta name="twitter:description" content="${descEsc}" />
    <meta name="twitter:image" content="${DEFAULT_IMAGE}" />
  `;

  if (meta.jsonLd) {
    head += `\n    <script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`;
  }

  // Inject CSS links
  for (const css of assets.css) {
    head += `\n    <link rel="stylesheet" href="/${css}" />`;
  }

  // Build body with JS module scripts
  let scripts = "";
  for (const js of assets.js) {
    scripts += `\n    <script type="module" crossorigin src="/${js}"></script>`;
  }

  return `<!doctype html>
<html lang="ru">
  <head>${head}
  </head>
  <body>
    <div id="root"></div>${scripts}
  </body>
</html>`;
}

// ─── static routes ──────────────────────────────────────────────────
const staticRoutes: RouteMeta[] = [
  {
    path: "/",
    title: `Косметология и дерматология в ${CITY} — ${CLINIC_NAME}`,
    description: `${CLINIC_NAME} — центр косметологии, дерматологии и трихологии в ${CITY}. Лазерные процедуры, инъекционная косметология, лечение акне. Рейтинг 5.0.`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": `${DOMAIN}/#clinic`,
      name: CLINIC_NAME,
      url: DOMAIN,
      telephone: "+7 (918) 412-85-85",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. 70-летия Октября, 1/2",
        addressLocality: CITY,
        addressRegion: "Краснодарский край",
        postalCode: "350000",
        addressCountry: "RU",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "6517",
        bestRating: "5",
      },
      medicalSpecialty: ["Dermatology", "PlasticSurgery"],
    },
  },
  {
    path: "/specialists",
    title: `Врачи клиники «Яблоко» — специалисты ${CITY}`,
    description: `Команда врачей ${CLINIC_NAME}: дерматологи, косметологи, трихологи. Опыт от 5 лет, индивидуальный подход, запись онлайн.`,
  },
  {
    path: "/services",
    title: `Услуги — ${CLINIC_NAME} ${CITY}`,
    description: `Каталог услуг ${CLINIC_NAME}: косметология, дерматология, трихология, массаж, остеопатия. Актуальные цены и онлайн-запись.`,
  },
  {
    path: "/advice",
    title: `Блог о здоровье кожи — ${CLINIC_NAME}`,
    description: `Статьи врачей ${CLINIC_NAME}: советы по уходу за кожей, подготовка к процедурам, кейсы лечения. Доказательная косметология.`,
  },
  {
    path: "/about",
    title: `О клинике «Яблоко» — ${CITY}`,
    description: `${CLINIC_NAME} — частная клиника дерматологии и косметологии в ${CITY}. Современное оборудование, индивидуальный подход, более 6500 довольных пациентов.`,
  },
  {
    path: "/contacts",
    title: `Контакты — ${CLINIC_NAME} ${CITY}`,
    description: `Адрес, телефон и график работы ${CLINIC_NAME}. ул. 70-летия Октября, 1/2, ${CITY}. Запись по телефону +7 (918) 412-85-85.`,
  },
  {
    path: "/price",
    title: `Цены на услуги — ${CLINIC_NAME} ${CITY}`,
    description: `Актуальный прайс-лист ${CLINIC_NAME}. Цены на косметологию, дерматологию, трихологию, массаж. Без скрытых доплат.`,
  },
  {
    path: "/patients",
    title: `Информация для пациентов — ${CLINIC_NAME}`,
    description: `Полезная информация для пациентов ${CLINIC_NAME}: подготовка к процедурам, противопоказания, часто задаваемые вопросы.`,
  },
  {
    path: "/privacy",
    title: `Политика конфиденциальности — ${CLINIC_NAME}`,
    description: `Политика обработки персональных данных ${CLINIC_NAME}. Соответствие ФЗ-152.`,
  },
];

// ─── data extractors (work on raw TS source, no import needed) ──────
function extractServices(content: string): RouteMeta[] {
  const results: RouteMeta[] = [];

  // Extract from servicePages (detailed data with subtitle)
  const pageRegex = /"([^"]+)":\s*\{[^}]*slug:\s*"([^"]+)"[^}]*title:\s*"([^"]+)"[^}]*subtitle:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  const detailedSlugs = new Set<string>();

  // Simpler approach: extract all slug+title pairs from serviceCategories
  const slugTitleRegex = /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g;
  while ((m = slugTitleRegex.exec(content)) !== null) {
    const slug = m[1];
    const title = m[2];
    if (!detailedSlugs.has(slug)) {
      detailedSlugs.add(slug);
      results.push({
        path: `/services/${slug}`,
        title: `${title} — ${CLINIC_NAME} ${CITY}`,
        description: `${title} в ${CLINIC_NAME}, ${CITY}. Современные методики, опытные врачи, индивидуальный подход. Запись онлайн.`,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          name: title,
          provider: { "@type": "MedicalClinic", "@id": `${DOMAIN}/#clinic` },
          url: `${DOMAIN}/services/${slug}`,
        },
      });
    }
  }

  return results;
}

function extractArticles(content: string): RouteMeta[] {
  const results: RouteMeta[] = [];
  // Match slug, title, excerpt blocks
  const regex = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content)) !== null) {
    results.push({
      path: `/advice/${m[1]}`,
      title: `${m[2]} — ${CLINIC_NAME}`,
      description: m[3].slice(0, 155),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: m[2],
        publisher: { "@type": "Organization", name: CLINIC_NAME },
        url: `${DOMAIN}/advice/${m[1]}`,
      },
    });
  }
  return results;
}

function extractDoctors(content: string): RouteMeta[] {
  const results: RouteMeta[] = [];
  const regex = /^\s+"([a-z][\w-]+)":\s*\{/gm;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content)) !== null) {
    const slug = m[1];
    results.push({
      path: `/doctor/${slug}`,
      title: `Врач ${slug} — ${CLINIC_NAME} ${CITY}`,
      description: `Профиль врача клиники «Яблоко». Образование, специализация, отзывы пациентов. Запись онлайн.`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Physician",
        url: `${DOMAIN}/doctor/${slug}`,
        worksFor: { "@type": "MedicalClinic", "@id": `${DOMAIN}/#clinic` },
      },
    });
  }
  return results;
}

// ─── plugin ─────────────────────────────────────────────────────────
export function prerenderMetaPlugin(): Plugin {
  return {
    name: "vite-plugin-prerender-meta",
    enforce: "post",

    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const indexHtml = path.join(distDir, "index.html");

      if (!fs.existsSync(indexHtml)) {
        console.warn("⚠️  prerender-meta: dist/index.html not found, skipping");
        return;
      }

      const template = fs.readFileSync(indexHtml, "utf-8");

      // Discover built assets from the template
      const cssMatches = [...template.matchAll(/href="\/([^"]+\.css)"/g)].map((m) => m[1]);
      const jsMatches = [...template.matchAll(/src="\/([^"]+\.js)"/g)].map((m) => m[1]);
      const assets = { css: cssMatches, js: jsMatches };

      // Read data files
      const srcDir = path.resolve(__dirname, "src/data");
      const servicesContent = fs.readFileSync(path.join(srcDir, "servicesData.ts"), "utf-8");
      const articlesContent = fs.readFileSync(path.join(srcDir, "articlesData.ts"), "utf-8");
      const doctorsContent = fs.readFileSync(path.join(srcDir, "doctorProfiles.ts"), "utf-8");

      // Collect all routes
      const allRoutes: RouteMeta[] = [
        ...staticRoutes,
        ...extractServices(servicesContent),
        ...extractArticles(articlesContent),
        ...extractDoctors(doctorsContent),
      ];

      let generated = 0;

      for (const route of allRoutes) {
        // Skip root – index.html already exists
        if (route.path === "/") {
          // Overwrite root index.html with enriched meta
          const html = buildHtml(template, route, assets);
          fs.writeFileSync(indexHtml, html, "utf-8");
          generated++;
          continue;
        }

        // Create directory structure: /services/botox → dist/services/botox/index.html
        const dirPath = path.join(distDir, route.path);
        fs.mkdirSync(dirPath, { recursive: true });

        const html = buildHtml(template, route, assets);
        fs.writeFileSync(path.join(dirPath, "index.html"), html, "utf-8");
        generated++;
      }

      console.log(`✅ prerender-meta: generated ${generated} HTML shells with SEO meta`);
    },
  };
}
