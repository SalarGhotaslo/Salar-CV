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
    for (const project of content.projects) {
      for (const tech of project.tech) {
        expect(screen.getByText(tech)).toBeInTheDocument();
      }
    }
  });

  it("renders each project description", () => {
    render(<Projects />);
    for (const project of content.projects) {
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it("does not render a GitHub link for projects where github is null", () => {
    const nullGithubProjects = content.projects.filter((p) => !p.github);
    if (nullGithubProjects.length > 0) {
      render(<Projects />);
      expect(
        screen.queryByRole("link", { name: /github/i })
      ).not.toBeInTheDocument();
    }
  });

  it("does not render a live site link for projects where live is null", () => {
    const nullLiveProjects = content.projects.filter((p) => !p.live);
    if (nullLiveProjects.length > 0) {
      render(<Projects />);
      expect(
        screen.queryByRole("link", { name: /live site/i })
      ).not.toBeInTheDocument();
    }
  });

  it("section heading says 'Things I\\'ve built'", () => {
    render(<Projects />);
    expect(
      screen.getByRole("heading", { name: /things i.ve built/i })
    ).toBeInTheDocument();
  });
});
