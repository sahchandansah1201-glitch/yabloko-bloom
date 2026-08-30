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
