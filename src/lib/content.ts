export const content = {
  name: "Salar Ghotaslo",
  email: "Salar_@live.co.uk",
  role: "TODO: e.g. Senior Software Engineer / Full-Stack Developer",
  location: "TODO: e.g. London, UK",
  bio: [
    "TODO: First paragraph — who you are and what you do.",
    "TODO: Second paragraph — what you care about / your approach.",
    "TODO: Third paragraph — what you're working on or interested in right now.",
  ],
  stats: {
    yearsOfExperience: 0, // TODO: e.g. 5
    projectsShipped: 0,   // TODO: e.g. 20
    technologiesUsed: 0,  // TODO: e.g. 15
  },
  skills: [
    {
      category: "Languages",
      items: ["TODO: e.g. TypeScript", "JavaScript", "Python"],
    },
    {
      category: "Frameworks",
      items: ["TODO: e.g. Next.js", "React", "Node.js"],
    },
    {
      category: "Tools",
      items: ["TODO: e.g. Git", "Docker", "Vitest", "Playwright"],
    },
    {
      category: "Cloud",
      items: ["TODO: e.g. Vercel", "AWS", "GCP"],
    },
  ],
  projects: [
    {
      name: "TODO: Project Name",
      description: "TODO: One or two sentences describing what it does and why it matters.",
      tech: ["TODO: Next.js", "TypeScript"],
      github: "TODO: https://github.com/...",
      live: "TODO: https://...",
      featured: true,
    },
    {
      name: "TODO: Project Name",
      description: "TODO: One or two sentences.",
      tech: ["TODO: React", "Node.js"],
      github: "TODO: https://github.com/...",
      live: null,
      featured: false,
    },
  ],
  experience: [
    {
      company: "TODO: Company Name",
      role: "TODO: Job Title",
      start: "TODO: e.g. Jan 2022",
      end: "Present",
      bullets: [
        "TODO: Achievement or responsibility #1.",
        "TODO: Achievement or responsibility #2.",
        "TODO: Achievement or responsibility #3.",
      ],
    },
    {
      company: "TODO: Previous Company",
      role: "TODO: Job Title",
      start: "TODO: e.g. Jun 2019",
      end: "TODO: e.g. Dec 2021",
      bullets: [
        "TODO: Achievement or responsibility #1.",
        "TODO: Achievement or responsibility #2.",
      ],
    },
  ],
  social: {
    github: "TODO: https://github.com/...",
    linkedin: "TODO: https://linkedin.com/in/...",
    twitter: null, // set to null if you don't want it shown
  },
} as const;

export type Content = typeof content;

export function buildContextFromContent(): string {
  const c = content;

  const skills = c.skills
    .map((s) => `${s.category}: ${s.items.join(", ")}`)
    .join("\n");

  const projects = c.projects
    .map(
      (p) =>
        `- ${p.name}: ${p.description} (Tech: ${p.tech.join(", ")})` +
        (p.live ? ` Live: ${p.live}` : "") +
        (p.github ? ` GitHub: ${p.github}` : "")
    )
    .join("\n");

  const experience = c.experience
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.start} – ${e.end})\n  ${e.bullets.join("\n  ")}`
    )
    .join("\n");

  const socials = Object.entries(c.social)
    .filter(([, v]) => v !== null)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");

  return `
Name: ${c.name}
Role: ${c.role}
Location: ${c.location}
Email: ${c.email}

Bio:
${c.bio.join("\n\n")}

Skills:
${skills}

Projects:
${projects}

Experience:
${experience}

Social: ${socials}
`.trim();
}
