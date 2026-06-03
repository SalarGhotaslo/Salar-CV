import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Nav from "./index";

vi.mock("framer-motion", async () => {
  const { buildFramerMotionMock } = await import("@/test/framer-motion-mock");
  return buildFramerMotionMock();
});

describe("Nav", () => {
  it("renders the logo with the first name", () => {
    render(<Nav />);
    expect(screen.getByText("Salar")).toBeInTheDocument();
  });

  it("renders all six navigation links", () => {
    render(<Nav />);
    for (const label of [
      "About",
      "Skills",
      "Projects",
      "Experience",
      "Education",
      "Contact",
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("each desktop link points to the correct anchor", () => {
    render(<Nav />);
    const expected: [string, string][] = [
      ["About", "#about"],
      ["Skills", "#skills"],
      ["Projects", "#projects"],
      ["Experience", "#experience"],
      ["Education", "#education"],
      ["Contact", "#contact"],
    ];
    for (const [label, href] of expected) {
      const links = screen.getAllByRole("link", { name: label });
      expect(links[0]).toHaveAttribute("href", href);
    }
  });

  it("hamburger starts with aria-expanded false", () => {
    render(<Nav />);
    expect(
      screen.getByRole("button", { name: /toggle menu/i })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking hamburger sets aria-expanded to true", () => {
    render(<Nav />);
    const btn = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking hamburger twice closes the menu again", () => {
    render(<Nav />);
    const btn = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("scroll event closes an open mobile menu", async () => {
    render(<Nav />);
    const btn = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");

    fireEvent.scroll(window);

    await waitFor(() => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });
});
