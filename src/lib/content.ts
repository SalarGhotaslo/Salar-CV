export const content = {
  name: "Salar Ghotaslo",
  email: "salar_@live.co.uk",
  phone: "+44 7344 329 892",
  role: "Front End Engineer · Live Service Team Lead",
  location: "London, UK",
  bio: [
    "Front End Engineer and Live Service Lead specialising in React, TypeScript, and user-centric web platforms. I bring five years of hands-on engineering at Deloitte Digital, where I lead development and live-service operations on enterprise-scale public-sector systems.",
    "I thrive at the intersection of product quality and operational reliability — owning incident management, mentoring engineers, and championing continuous improvement. I care deeply about code that is maintainable, observable, and genuinely useful to the people who depend on it.",
    "Outside of client work I explore AI agents and automation tooling, and I built this site as a side project to experiment with streaming LLMs and Next.js 15.",
  ],
  stats: {
    yearsOfExperience: 5,
    projectsShipped: 15,
    technologiesUsed: 20,
  },
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "React", "GraphQL", "HTML", "CSS", "Node.js"],
    },
    {
      category: "DevOps & Infrastructure",
      items: ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "AWS", "CI/CD"],
    },
    {
      category: "Frontend Tooling",
      items: ["Storybook", "Vite", "Tailwind", "Material UI", "Jest", "Cypress"],
    },
    {
      category: "Practices",
      items: ["Agile Scrum", "TDD", "Pair Programming", "Code Reviews", "Incident Management"],
    },
  ],
  projects: [
    {
      name: "Personal CV Website (this site)",
      description: "A single-page personal site with an AI chatbot that answers questions about me in real time, built with Next.js 15 App Router and a streaming OpenRouter integration.",
      tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "OpenRouter"],
      github: null,
      live: null,
      featured: true,
    },
  ],
  experience: [
    {
      company: "Deloitte Digital",
      role: "Manager – Front End Engineer / Live Service Team Lead",
      start: "Jun 2021",
      end: "Present",
      tech: ["React", "TypeScript", "GraphQL", "Jenkins", "AWS", "Kubernetes", "CI/CD"],
      bullets: [
        "Lead developer and Live Service Team Lead on a public-sector client engagement (Project Blackjack).",
        "Designed, developed, and maintained a React + TypeScript dashboard enabling users to access key data and navigate dynamic content views.",
        "Owned incident management and triage, coordinating between client teams, developers, and BAs to resolve live production issues and minimise downtime — reducing average incident turnaround time by ~30%.",
        "Collaborated with QA, DevOps, and design teams to ensure stable releases, security compliance, and smooth post-deployment performance.",
        "Mentored new joiners through detailed onboarding sessions, enabling immediate contribution to active sprints.",
        "Continuously improved delivery pipelines via Jenkins and GitHub Actions for safe, automated deployments.",
        "Leveraged AI agents to accelerate development workflows, automate repetitive tasks, and enhance code quality during feature delivery.",
        "Promoted a DevOps mindset in front-end teams, integrating observability metrics and feedback loops into release cycles.",
      ],
    },
    {
      company: "Marks & Spencer",
      role: "Business Analyst (Systems & Development)",
      start: "Jan 2017",
      end: "Oct 2020",
      tech: ["Excel", "PowerBI"],
      bullets: [
        "Supported programme management in the delivery and deployment of new software systems.",
        "Automated internal dashboards and reporting pipelines using Excel, PowerBI, and scripting.",
        "Conducted hands-on testing and validation of platforms before wider rollout.",
      ],
    },
    {
      company: "Age UK Wandsworth",
      role: "Volunteer",
      start: "Oct 2017",
      end: "Present",
      tech: [],
      bullets: [
        "Supported elderly residents through community programmes, strengthening communication and empathy skills.",
      ],
    },
  ],
  education: [
    {
      institution: "Makers Academy",
      qualification: "Software Engineering Bootcamp",
      year: "2021",
      detail: "Full-stack development using OOP, TDD, and Agile. Delivered group projects integrating React, Rails, and Node.js across full CI/CD workflows.",
    },
    {
      institution: "University of Plymouth",
      qualification: "BSc (Hons) Mathematics and Finance",
      year: "2016",
      detail: "",
    },
  ],
  social: {
    github: "https://github.com/sghotaslo",
    linkedin: "https://linkedin.com/in/salar-ghotaslo",
    twitter: null,
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

  const education = c.education
    .map((e) => `- ${e.qualification}, ${e.institution} (${e.year})${e.detail ? ": " + e.detail : ""}`)
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
Phone: ${c.phone}

Bio:
${c.bio.join("\n\n")}

Skills:
${skills}

Projects:
${projects}

Experience:
${experience}

Education:
${education}

Social: ${socials}
`.trim();
}
