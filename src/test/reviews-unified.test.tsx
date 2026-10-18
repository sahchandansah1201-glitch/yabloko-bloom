import { afterEach, describe, expect, it } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import ReviewsUnifiedDemo from "@/pages/ReviewsUnifiedDemo";

let root: Root | undefined;
let container: HTMLDivElement;
function render() {
  container = document.createElement("div"); document.body.append(container);
  root = createRoot(container);
  act(() => root?.render(<HelmetProvider><ReviewsUnifiedDemo /></HelmetProvider>));
  return container;
}
function click(element: Element | null) {
  if (!(element instanceof HTMLElement)) throw new Error("Missing interactive control");
  act(() => element.click());
}
afterEach(() => { act(() => root?.unmount()); container?.remove(); });

describe("isolated review demo", () => {
  it("switches all four sources without using real review IDs", () => {
    const page = render();
    const expected = ["https://yandex.ru/maps/org/yabloko/64934325707/", "https://2gis.ru/krasnodar/firm/70000001033657523", "https://maps.app.goo.gl/466w7vogWfcf7FUr7", "https://prodoctorov.ru/krasnodar/lpu/54990-yabloko/"];
    const tabs = page.querySelectorAll('[role="tab"]');
    expect(tabs).toHaveLength(4);
    tabs.forEach((tab, i) => {
      click(tab); expect(tab.getAttribute("aria-selected")).toBe("true");
      expect(page.querySelector("article a")?.getAttribute("href")).toBe(expected[i]);
      expect(page.querySelectorAll("article")).toHaveLength(3);
    });
  });
  it("keeps the explicit demo disclosure outside the review section", () => {
    const page = render(); const banner = page.querySelector('[role="note"]');
    expect(banner?.textContent).toContain("Демонстрационные отзывы и оценки, не реальные данные площадок");
    expect(banner?.closest("section")).toBeNull();
  });
  it("shows three more reviews and collapses to three", () => {
    const page = render();
    click(Array.from(page.querySelectorAll("button")).find(b => b.textContent === "Показать ещё 3") ?? null);
    expect(page.querySelectorAll("article")).toHaveLength(6);
    click(Array.from(page.querySelectorAll("button")).find(b => b.textContent === "Свернуть") ?? null);
    expect(page.querySelectorAll("article")).toHaveLength(3);
  });
  it("never collapses short reviews without a read-more control in either version", () => {
    const page = render();
    const check = (scope: ParentNode) => {
      const texts = Array.from(scope.querySelectorAll(".demo-text"));
      const shortTexts = texts.filter(text => (text.textContent?.length ?? 0) <= 350);
      expect(shortTexts.length).toBeGreaterThan(0);
      shortTexts.forEach(text => expect(text.classList.contains("is-collapsed")).toBe(false));
      expect(texts.find(text => (text.textContent?.length ?? 0) > 350)?.classList.contains("is-collapsed")).toBe(true);
    };
    check(page);
    const html = readFileSync("public/design/reviews-unified-standalone.html", "utf8");
    const standalone = document.createElement("div");
    standalone.innerHTML = html;
    const script = standalone.querySelector("script")?.textContent;
    if (!script) throw new Error("Missing standalone script");
    const standaloneDocument = { querySelector: standalone.querySelector.bind(standalone), getElementById: (id: string) => standalone.querySelector(`[id="${id}"]`) };
    new Function("document", script)(standaloneDocument);
    check(standalone);
  });
  it("expands and collapses text and the clinic reply", () => {
    const page = render();
    const expand = Array.from(page.querySelectorAll("button")).find(b => b.textContent === "Читать полностью");
    click(expand ?? null); expect(expand?.getAttribute("aria-expanded")).toBe("true");
    click(expand ?? null); expect(expand?.getAttribute("aria-expanded")).toBe("false");
    const reply = Array.from(page.querySelectorAll("button")).find(b => b.textContent === "Ответ клиники");
    click(reply ?? null); expect(page.querySelector(".demo-reply")).not.toBeNull();
    click(reply ?? null); expect(page.querySelector(".demo-reply")).toBeNull();
  });
  it("supports arrow-key source selection and focus", () => {
    const page = render(); const first = page.querySelector('[role="tab"]');
    act(() => first?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })));
    expect(page.querySelectorAll('[role="tab"]')[1].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(page.querySelectorAll('[role="tab"]')[1]);
  });
  it.each([
    ["src/pages/Index.tsx", "02e4b39a80eb70b29c5486d32a7b59e0b875311ee16f11c5d640bc6c98afee32"],
    ["src/components/layout/Footer.tsx", "d51f494f6e19478bb2ac945169ed7220e3a77c709222ddd9b0721dbb9b257064"],
  ])("leaves %s byte-for-byte unchanged", (path, hash) => {
    expect(createHash("sha256").update(readFileSync(path)).digest("hex")).toBe(hash);
  });
});