import { describe, it, expect } from "vitest";
import { content, buildContextFromContent } from "./content";

describe("content", () => {
  it("has required top-level fields", () => {
    expect(content.name).toBeTruthy();
    expect(content.email).toBeTruthy();
    expect(content.skills).toBeInstanceOf(Array);
    expect(content.projects).toBeInstanceOf(Array);
    expect(content.experience).toBeInstanceOf(Array);
  });

  it("every skill category has at least one item", () => {
    for (const skill of content.skills) {
      expect(skill.items.length).toBeGreaterThan(0);
    }
  });

  it("every project has name, description, and tech array", () => {
    for (const project of content.projects) {
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tech).toBeInstanceOf(Array);
    }
  });

  it("every experience entry has required fields", () => {
    for (const exp of content.experience) {
      expect(exp.company).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.start).toBeTruthy();
      expect(exp.end).toBeTruthy();
      expect(exp.bullets.length).toBeGreaterThan(0);
    }
  });
});

describe("buildContextFromContent", () => {
  it("includes name, email, and role", () => {
    const ctx = buildContextFromContent();
    expect(ctx).toContain(content.name);
    expect(ctx).toContain(content.email);
    expect(ctx).toContain(content.role);
  });

  it("includes all skill categories", () => {
    const ctx = buildContextFromContent();
    for (const skill of content.skills) {
      expect(ctx).toContain(skill.category);
    }
  });

  it("includes all project names", () => {
    const ctx = buildContextFromContent();
    for (const project of content.projects) {
      expect(ctx).toContain(project.name);
    }
  });

  it("includes all company names from experience", () => {
    const ctx = buildContextFromContent();
    for (const exp of content.experience) {
      expect(ctx).toContain(exp.company);
    }
  });

  it("returns a non-empty string", () => {
    const ctx = buildContextFromContent();
    expect(typeof ctx).toBe("string");
    expect(ctx.length).toBeGreaterThan(100);
  });
});
