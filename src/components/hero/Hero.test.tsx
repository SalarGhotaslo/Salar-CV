import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "./index";
import { content } from "@/lib/content";

vi.mock("framer-motion", async () => {
  const { buildFramerMotionMock } = await import("@/test/framer-motion-mock");
  return buildFramerMotionMock();
});

describe("Hero", () => {
  it("renders the location from content", () => {
    render(<Hero />);
    expect(screen.getByText(content.location)).toBeInTheDocument();
  });

  it("renders the first name in the heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      content.name.split(" ")[0]
    );
  });

  it("renders the role as subtitle", () => {
    render(<Hero />);
    expect(screen.getByText(content.role)).toBeInTheDocument();
  });

  it('"View Projects" links to #projects', () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /view projects/i })
    ).toHaveAttribute("href", "#projects");
  });

  it('"Chat with my AI" button dispatches the open-chat event', () => {
    render(<Hero />);
    const spy = vi.fn();
    window.addEventListener("open-chat", spy);
    fireEvent.click(screen.getByRole("button", { name: /chat with my ai/i }));
    expect(spy).toHaveBeenCalledOnce();
    window.removeEventListener("open-chat", spy);
  });
});
