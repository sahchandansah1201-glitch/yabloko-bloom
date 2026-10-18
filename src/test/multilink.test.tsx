import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import Multilink from "@/pages/Multilink";

afterEach(cleanup);

const expectedLinks = [
  ["Яндекс Карты", "https://yandex.ru/maps/org/yabloko/64934325707/?ll=38.903861%2C45.026285&z=16"],
  ["ПроДокторов", "https://prodoctorov.ru/krasnodar/lpu/54990-yabloko/"],
  ["2ГИС", "https://2gis.ru/krasnodar/firm/70000001033657523"],
  ["Google Карты", "https://maps.app.goo.gl/466w7vogWfcf7FUr7"],
];

describe("legacy voluntary review destinations", () => {
  it.each(expectedLinks)("preserves %s exactly and opens it safely", (name, href) => {
    render(<HelmetProvider><MemoryRouter><Multilink /></MemoryRouter></HelmetProvider>);
    const link = screen.getByRole("link", { name: `${name} — открыть в новой вкладке` });
    expect(link.getAttribute("href")).toBe(href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")?.split(" ")).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
  });

  it("offers all four destinations directly without a form or sentiment gate", () => {
    const { container } = render(<HelmetProvider><MemoryRouter><Multilink /></MemoryRouter></HelmetProvider>);
    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(container.querySelectorAll("form,input,textarea,select")).toHaveLength(0);
    expect(screen.getByRole("link", { name: "На сайт клиники" })).toHaveAttribute("href", "/");
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