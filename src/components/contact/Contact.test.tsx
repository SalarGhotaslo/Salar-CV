import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./index";
import { content } from "@/lib/content";

vi.mock("framer-motion", async () => {
  const { buildFramerMotionMock } = await import("@/test/framer-motion-mock");
  return buildFramerMotionMock();
});

describe("Contact", () => {
  it("email link points to the correct mailto address", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /say hello/i })).toHaveAttribute(
      "href",
      `mailto:${content.email}`
    );
  });

  it("CV download link points to the PDF and has download attribute", () => {
    render(<Contact />);
    const link = screen.getByRole("link", { name: /download cv/i });
    expect(link).toHaveAttribute("href", "/Salar_Ghotaslo_CV.pdf");
    expect(link).toHaveAttribute("download");
  });

  it("renders the GitHub social link", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      content.social.github
    );
  });

  it("renders the LinkedIn social link", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      content.social.linkedin
    );
  });

  it("does not render the Twitter/X link when twitter is null", () => {
    render(<Contact />);
    expect(screen.queryByRole("link", { name: /^x$/i })).not.toBeInTheDocument();
  });

  it("section heading says 'Get in touch'", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: /get in touch/i })
    ).toBeInTheDocument();
  });

  it("social links open in a new tab", () => {
    render(<Contact />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
