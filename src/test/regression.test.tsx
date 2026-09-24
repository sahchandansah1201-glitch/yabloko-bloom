import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (p: string) => readFileSync(path.resolve(process.cwd(), p), "utf8");

describe("REF-404: category links and legacy redirects", () => {
  const footer = read("src/components/layout/Footer.tsx");
  const app = read("src/App.tsx");

  it("footer links point at the existing catalog tabs", () => {
    for (const tab of ["cosmetology", "dermatology", "trichology", "health"]) {
      expect(footer).toContain(`to="/services?tab=${tab}"`);
      expect(footer).not.toContain(`to="/services/${tab}"`);
    }
  });

  it("legacy /services/<category> urls redirect to the matching tab", () => {
    for (const tab of ["cosmetology", "dermatology", "trichology", "health"]) {
      expect(app).toContain(
        `<Route path="/services/${tab}" element={<Navigate to="/services?tab=${tab}" replace />} />`
      );
    }
    // unknown slugs still fall through to ServicePage (404)
    expect(app).toContain('<Route path="/services/:slug" element={<ServicePage />} />');
  });
});

describe("REF-UI-01: services tabs list wraps to its real height", () => {
  const hub = read("src/pages/ServicesHub.tsx");

  it("overrides the fixed 40px TabsList height and allows wrapping triggers", () => {
    expect(hub).toContain("h-auto");
    expect(hub).toMatch(/TabsList className="[^"]*flex-wrap/);
    expect(hub).toMatch(/TabsTrigger[\s\S]{0,200}whitespace-normal/);
  });
});

describe("REF-TEXT-01: doctor booking form heading", () => {
  const form = read("src/components/doctor-profile/DoctorProfileBookingForm.tsx");

  it("uses a case-neutral heading and renders the full doctor name", () => {
    expect(form).toContain("Запись на приём");
    expect(form).not.toContain("Записаться к");
    expect(form).not.toContain("firstName");
    expect(form).toContain("{doctorName}");
    expect(form).toContain("doctor_id: doctorId");
  });
});

describe("REF-TEXT-02: service hero recovery label", () => {
  const hero = read("src/components/service-page/ServiceHero.tsx");

  it("does not append 'реабилитация' when the value already mentions it", () => {
    expect(hero).not.toContain("${recovery} реабилитация");
    expect(hero).toContain("/реабилитац/i.test(recovery)");
    expect(hero).toContain("`Реабилитация: ${recovery}`");
  });
});

describe("REF-TEXT-03: 404 page is localized", () => {
  const nf = read("src/pages/NotFound.tsx");

  it("uses Russian copy and keeps the home link", () => {
    expect(nf).toContain("Страница не найдена");
    expect(nf).toContain("На главную");
    expect(nf).not.toContain("Oops!");
    expect(nf).not.toContain("Return to Home");
    expect(nf).toContain('href="/"');
  });
});

describe("REF-UI-02: doctors carousel controls are reachable at every width", () => {
  const c = read("src/components/home/DoctorsCarousel.tsx");

  it("renders a visible control row below the carousel on narrow screens", () => {
    expect(c).toMatch(/xl:hidden[\s\S]{0,400}CarouselPrevious/);
    expect(c).toContain('aria-label="Предыдущий врач"');
    expect(c).toContain('aria-label="Следующий врач"');
    expect(c).toContain("static translate-y-0");
  });
});

import { clinicDocuments as __docs } from "@/data/clinicDocuments";
import { hasDocumentText } from "@/data/documentTexts";
describe("document detail pages", () => {
  it("has 51 unique slugs and extracted text for each", () => {
    expect(__docs).toHaveLength(51);
    expect(new Set(__docs.map((d) => d.slug)).size).toBe(51);
    __docs.forEach((d) => {
      expect(d.slug).toMatch(/^[a-z0-9-]+$/);
      expect(d.href).toMatch(/^https:\/\/yaclinic\.ru\//);
      expect(hasDocumentText(d.id)).toBe(true);
    });
    expect(__docs.filter((d) => d.category !== "consents")).toHaveLength(21);
  });
});

describe("REF-DOC-DATE: unverified date is not shown on document pages", () => {
  it("DocumentDetailPage has no auto-detected date heuristic or 'Дата в тексте' label", () => {
    const src = readFileSync(path.resolve(__dirname, "../pages/DocumentDetailPage.tsx"), "utf8");
    expect(src).not.toContain("Дата в тексте");
    expect(src).not.toMatch(/DATE_RE|MONTHS|blockText/);
  });
});

describe("REF-DOC-ROW: catalog rows use the title as the only link", () => {
  it("has no 'Читать документ' button and uses a stretched link", () => {
    const src = readFileSync(path.resolve(__dirname, "../pages/DocumentsPage.tsx"), "utf8");
    expect(src).not.toContain("Читать документ");
    expect(src).toContain("after:absolute after:inset-0");
  });
});
