import { describe, it, expect } from "vitest";
import { content, buildContextFromContent } from "./content";

describe("content — structure", () => {
  it("has required top-level fields", () => {
    expect(content.name).toBeTruthy();
    expect(content.email).toBeTruthy();
    expect(content.phone).toBeTruthy();
    expect(content.role).toBeTruthy();
    expect(content.location).toBeTruthy();
    expect(content.skills).toBeInstanceOf(Array);
    expect(content.projects).toBeInstanceOf(Array);
    expect(content.experience).toBeInstanceOf(Array);
    expect(content.education).toBeInstanceOf(Array);
  });

  it("has valid stats with numeric values", () => {
    expect(typeof content.stats.yearsOfExperience).toBe("number");
    expect(typeof content.stats.projectsShipped).toBe("number");
    expect(typeof content.stats.technologiesUsed).toBe("number");
    expect(content.stats.yearsOfExperience).toBeGreaterThan(0);
  });

  it("has bio as a non-empty array of strings", () => {
    expect(content.bio).toBeInstanceOf(Array);
    expect(content.bio.length).toBeGreaterThan(0);
    for (const para of content.bio) {
      expect(typeof para).toBe("string");
      expect(para.length).toBeGreaterThan(0);
    }
  });

  it("every skill category has at least one item", () => {
    for (const skill of content.skills) {
      expect(skill.category).toBeTruthy();
      expect(skill.items.length).toBeGreaterThan(0);
    }
  });

  it("every project has name, description, and tech array", () => {
    for (const project of content.projects) {
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tech).toBeInstanceOf(Array);
      expect(project.tech.length).toBeGreaterThan(0);
    }
  });

  it("every experience entry has required fields and at least one bullet", () => {
    for (const exp of content.experience) {
      expect(exp.company).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.start).toBeTruthy();
      expect(exp.end).toBeTruthy();
      expect(exp.bullets.length).toBeGreaterThan(0);
    }
  });

  it("every education entry has institution, qualification, and year", () => {
    for (const edu of content.education) {
      expect(edu.institution).toBeTruthy();
      expect(edu.qualification).toBeTruthy();
      expect(edu.year).toBeTruthy();
    }
  });

  it("social has github and linkedin, twitter is null", () => {
    expect(content.social.github).toBeTruthy();
    expect(content.social.linkedin).toBeTruthy();
    expect(content.social.twitter).toBeNull();
  });

  it("email is a valid email address", () => {
    expect(content.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});

describe("buildContextFromContent", () => {
  it("includes name, email, role, location, and phone", () => {
    const ctx = buildContextFromContent();
    expect(ctx).toContain(content.name);
    expect(ctx).toContain(content.email);
    expect(ctx).toContain(content.role);
    expect(ctx).toContain(content.location);
    expect(ctx).toContain(content.phone);
  });

  it("includes all skill categories and their items", () => {
    const ctx = buildContextFromContent();
    for (const skill of content.skills) {
      expect(ctx).toContain(skill.category);
      for (const item of skill.items) {
        expect(ctx).toContain(item);
      }
    }
  });

  it("includes all project names and descriptions", () => {
    const ctx = buildContextFromContent();
    for (const project of content.projects) {
      expect(ctx).toContain(project.name);
      expect(ctx).toContain(project.description);
    }
  });

  it("includes all company names and roles from experience", () => {
    const ctx = buildContextFromContent();
    for (const exp of content.experience) {
      expect(ctx).toContain(exp.company);
      expect(ctx).toContain(exp.role);
    }
  });

  it("includes education institutions", () => {
    const ctx = buildContextFromContent();
    for (const edu of content.education) {
      expect(ctx).toContain(edu.institution);
      expect(ctx).toContain(edu.qualification);
    }
  });

  it("includes non-null social links and excludes null ones", () => {
    const ctx = buildContextFromContent();
    expect(ctx).toContain(content.social.github!);
    expect(ctx).toContain(content.social.linkedin!);
    expect(ctx).not.toContain("twitter: null");
  });

  it("returns a non-empty string", () => {
    const ctx = buildContextFromContent();
    expect(typeof ctx).toBe("string");
    expect(ctx.length).toBeGreaterThan(100);
  });

  it("produces consistent output on repeated calls", () => {
    expect(buildContextFromContent()).toBe(buildContextFromContent());
  });
});
