import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "./index";
import { content } from "@/lib/content";

vi.mock("framer-motion", async () => {
  const { buildFramerMotionMock } = await import("@/test/framer-motion-mock");
  return buildFramerMotionMock();
});

describe("Projects", () => {
  it("renders all project names", () => {
    render(<Projects />);
    for (const project of content.projects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
  });

  it("renders a 'Featured' badge for each featured project", () => {
    render(<Projects />);
    const featuredCount = content.projects.filter((p) => p.featured).length;
    expect(screen.getAllByText("Featured")).toHaveLength(featuredCount);
  });

  it("renders all tech tags for each project", () => {
    render(<Projects />);
    const allTech = content.projects.flatMap((p) => p.tech);
    const uniqueTech = [...new Set(allTech)];
    for (const tech of uniqueTech) {
      expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders each project description", () => {
    render(<Projects />);
    for (const project of content.projects) {
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it("renders GitHub links only for projects with a github url", () => {
    render(<Projects />);
    const withGithub = content.projects.filter((p) => p.github);
    const links = screen.queryAllByRole("link", { name: /github/i });
    expect(links).toHaveLength(withGithub.length);
  });

  it("renders live site links only for projects with a live url", () => {
    render(<Projects />);
    const withLive = content.projects.filter((p) => p.live);
    const links = screen.queryAllByRole("link", { name: /live site/i });
    expect(links).toHaveLength(withLive.length);
  });

  it("section heading says 'Things I\\'ve built'", () => {
    render(<Projects />);
    expect(
      screen.getByRole("heading", { name: /things i.ve built/i })
    ).toBeInTheDocument();
  });
});
