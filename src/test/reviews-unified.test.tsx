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
afterEach(() => { act(() => root?.unmount()); root = undefined; container?.remove(); });
const adapterSource = readFileSync("public/design/native-reviews-demo.js", "utf8");
const adapter = new Function(adapterSource.replace(/export /g, "") + ";return {createDemoPayload, mountNativeDemo, chromeOverride};")();
new Function(readFileSync("public/design/native-reviews-widget.js", "utf8"))();
async function native(index: number, all = false) {
  container = document.createElement("div"); document.body.append(container);
  const widget = adapter.mountNativeDemo(container, adapter.createDemoPayload(index, all));
  await new Promise(resolve => setTimeout(resolve, 60));
  return widget.shadowRoot as ShadowRoot;
}

describe("isolated native review demo", () => {
  it("keeps all four outer tabs working and keyboard focus", () => {
    const page = render(); const tabs = page.querySelectorAll('[role="tab"]');
    expect(tabs).toHaveLength(4);
    tabs.forEach(tab => { click(tab); expect(tab.getAttribute("aria-selected")).toBe("true"); });
    act(() => tabs[0].dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowRight", bubbles: true})));
    expect(document.activeElement).toBe(tabs[1]);
  });
  it("keeps the explicit disclosure outside the section", () => {
    const banner = render().querySelector('[role="note"]');
    expect(banner?.textContent).toContain("Демонстрационные отзывы и оценки, не реальные данные площадок");
    expect(banner?.closest("section")).toBeNull();
  });
  it.each([[0,"ym-reviews"],[1,"tg-reviews"],[2,"gm-reviews"],[3,"pd-reviews"]])("renders original native source %s with local data", async (index, className) => {
    const shadow = await native(Number(index));
    expect(shadow.querySelector(`.${className}`)).not.toBeNull();
    expect(shadow.querySelectorAll("article")).toHaveLength(3);
    const expected = ["https://yandex.ru/maps/org/yabloko/64934325707/", "https://2gis.ru/krasnodar/firm/70000001033657523", "https://maps.app.goo.gl/466w7vogWfcf7FUr7", "https://prodoctorov.ru/krasnodar/lpu/54990-yabloko/"];
    expect(shadow.querySelector(".rw-review-origin")?.getAttribute("href")).toBe(expected[Number(index)]);
    expect(container.querySelector("reviews-widget")?.hasAttribute("data-endpoint")).toBe(false);
    const payload = adapter.createDemoPayload(Number(index));
    expect(payload.settings.source_order).toEqual([payload.settings.default_source]);
    expect(payload.sources).toHaveLength(1);
  });
  it("shows six through local payload and returns to three", async () => {
    expect((await native(0, true)).querySelectorAll("article")).toHaveLength(6);
    container.remove();
    expect((await native(0)).querySelectorAll("article")).toHaveLength(3);
  });
  it("uses the original expandable Yandex reply", async () => {
    const shadow = await native(0);
    const toggle = shadow.querySelector(".ym-reply-toggle");
    click(toggle); await new Promise(resolve => setTimeout(resolve, 30));
    expect(shadow.querySelector(".ym-reply")).not.toBeNull();
    click(toggle); await new Promise(resolve => setTimeout(resolve, 30));
    expect(shadow.querySelector(".ym-reply")).toBeNull();
  });
  it("does not assert verified visits in demo data", () => {
    const twoGis = adapter.createDemoPayload(1).sources[0];
    expect(twoGis.place.ratings_count).toBe(0);
    twoGis.reviews.forEach((review: {verification: {verified: boolean; visits_count: null}}) => {
      expect(review.verification.verified).toBe(false); expect(review.verification.visits_count).toBeNull();
    });
    adapter.createDemoPayload(3).sources[0].reviews.forEach((review: {verification: {verified: boolean}; visit: null; doctor: null}) => {
      expect(review.verification.verified).toBe(false); expect(review.visit).toBeNull(); expect(review.doctor).toBeNull();
    });
  });
  it("preserves the original bundle byte-for-byte", () => {
    expect(createHash("sha256").update(readFileSync("public/design/native-reviews-widget.js")).digest("hex")).toBe("c580ffc4c68efda69537b1fd64c3068ca699efb829c1d6474a39059db0bd524b");
  });
  it.each([
    ["src/pages/Index.tsx", "02e4b39a80eb70b29c5486d32a7b59e0b875311ee16f11c5d640bc6c98afee32"],
    ["src/components/layout/Footer.tsx", "d51f494f6e19478bb2ac945169ed7220e3a77c709222ddd9b0721dbb9b257064"],
  ])("leaves %s byte-for-byte unchanged", (path, hash) => {
    expect(createHash("sha256").update(readFileSync(path)).digest("hex")).toBe(hash);
  });
});
