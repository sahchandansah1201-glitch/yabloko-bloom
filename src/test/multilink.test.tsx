import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import Multilink from "@/pages/Multilink";

function renderPage() {
  const html = renderToStaticMarkup(<HelmetProvider><MemoryRouter><Multilink /></MemoryRouter></HelmetProvider>);
  return new DOMParser().parseFromString(html, "text/html");
}

const expectedLinks = [
  ["Яндекс Карты", "https://yandex.ru/maps/org/yabloko/64934325707/?ll=38.903861%2C45.026285&z=16"],
  ["ПроДокторов", "https://prodoctorov.ru/krasnodar/lpu/54990-yabloko/"],
  ["2ГИС", "https://2gis.ru/krasnodar/firm/70000001033657523"],
  ["Google Карты", "https://maps.app.goo.gl/466w7vogWfcf7FUr7"],
];

describe("legacy voluntary review destinations", () => {
  it("keeps the portable static fragment below 20KB", () => {
    const html = readFileSync("public/multilink-wordpress.html");
    expect(html.byteLength).toBeLessThan(20 * 1024);
  });

  it("contains no embedded base64, scripts or forms", () => {
    const html = readFileSync("public/multilink-wordpress.html", "utf8");
    expect(html).not.toMatch(/base64\s*,/i);
    const fragment = new DOMParser().parseFromString(html, "text/html");
    expect(fragment.querySelectorAll("script,form")).toHaveLength(0);
  });

  it.each(expectedLinks)("preserves %s exactly and opens it safely", (name, href) => {
    const page = renderPage();
    const link = page.querySelector(`a[aria-label="${name} — открыть в новой вкладке"]`);
    expect(link?.getAttribute("href")).toBe(href);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")?.split(" ")).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
  });

  it("offers all four destinations directly without a form or sentiment gate", () => {
    const page = renderPage();
    expect(page.querySelectorAll("a")).toHaveLength(5);
    expect(page.querySelectorAll("form,input,textarea,select")).toHaveLength(0);
    expect(page.querySelector('a[href="/"]')).not.toBeNull();
  });

  it.each(expectedLinks)("portable fragment preserves %s exactly and safely", (name, href) => {
    const html = readFileSync("public/multilink-wordpress.html", "utf8");
    const fragment = new DOMParser().parseFromString(html, "text/html");
    const link = Array.from(fragment.querySelectorAll("a")).find((item) => item.textContent?.includes(name));
    expect(link?.getAttribute("href")).toBe(href);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")?.split(" ")).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
  });
});