import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "next-themes";
import { Navbar } from "./Navbar";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

const renderNav = () =>
  render(
    <ThemeProvider attribute="class">
      <Navbar />
    </ThemeProvider>,
  );

describe("<Navbar />", () => {
  it("has the main links", () => {
    renderNav();
    ["Home", "Pricing", "Blog"].forEach((l) =>
      expect(screen.getAllByRole("link", { name: l })[0]).toBeInTheDocument(),
    );
  });

  it("opens the mobile menu", async () => {
    renderNav();
    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(
      screen.getAllByRole("link", { name: "Home" }).length,
    ).toBeGreaterThan(1);
  });

  it("toggles theme class on <html>", async () => {
    renderNav();
    const btn = await screen.findByRole("button", { name: /toggle theme/i });
    const before = document.documentElement.classList.contains("dark");
    await userEvent.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(!before);
  });
});
