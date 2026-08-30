import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Footer } from "@/components/layout/Footer";
import { DoctorProfileBookingForm } from "@/components/doctor-profile/DoctorProfileBookingForm";

describe("REF-404: footer category links", () => {
  it("points the four category links at the existing catalog tabs", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    for (const [label, tab] of [
      ["Косметология", "cosmetology"],
      ["Дерматология", "dermatology"],
      ["Трихология", "trichology"],
      ["Здоровье", "health"],
    ] as const) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        `/services?tab=${tab}`
      );
    }
  });
});

describe("REF-TEXT-01: doctor booking form heading", () => {
  it("uses a case-neutral heading and shows the full doctor name", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <DoctorProfileBookingForm doctorId="test-id" doctorName="Петров Игорь Петрович" />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole("heading", { name: "Запись на приём" })).toBeInTheDocument();
    expect(screen.getByText("Петров Игорь Петрович")).toBeInTheDocument();
    expect(screen.queryByText(/Записаться к/)).not.toBeInTheDocument();
  });
});
