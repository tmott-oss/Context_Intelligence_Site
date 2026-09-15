export type BlueprintStage = {
  number: string;
  slug: string;
  title: string;
  prompt: string;
  statement?: string;
  description: string;
  listLabel: string;
  items: readonly string[];
  result: string;
};

export const blueprintStages: readonly BlueprintStage[] = [
  {
    number: "01",
    slug: "vision",
    title: "Vision",
    prompt: "Define the business outcomes.",
    description:
      "Align leadership around a clear three-to-five-year destination and define what AI-enabled success should look like before selecting technology.",
    listLabel: "Potential outcomes",
    items: ["Revenue growth", "Operational excellence", "Customer experience", "Employee productivity", "Competitive advantage"],
    result: "A clear destination.",
  },
  {
    number: "02",
    slug: "processes",
    title: "Processes",
    prompt: "Find the work worth transforming.",
    description:
      "Prioritize repeated, high-impact processes where improved execution can generate meaningful business value.",
    listLabel: "Examples",
    items: ["Customer interactions", "Sales execution", "Decision-making", "Knowledge transfer", "Operational handoffs", "Administrative work"],
    result: "A focused pipeline.",
  },
  {
    number: "03",
    slug: "context",
    title: "Context — The Foundation",
    prompt: "Build the Business Context Engine™.",
    description:
      "Connect the knowledge, rules, data, history, terminology, and operating reality AI needs to understand your business.",
    listLabel: "Business context includes",
    items: ["Customers", "Products and services", "Processes and policies", "Terminology", "Historical decisions", "Documents and meeting knowledge", "Tribal knowledge", "Business systems and operating rules"],
    result: "Accurate, reliable intelligence.",
  },
  {
    number: "04",
    slug: "workflows",
    title: "AI-Enabled Workflows",
    prompt: "Redesign the workflow around AI.",
    statement: "Do not simply automate tasks.",
    description:
      "Combine people, organizational context, AI, business rules, and systems into workflows that improve complete outcomes rather than accelerating isolated activities.",
    listLabel: "Example areas",
    items: ["Sales", "Marketing", "Customer success", "Operations", "Finance", "Human resources", "Leadership"],
    result: "Faster, better execution.",
  },
  {
    number: "05",
    slug: "agents",
    title: "AI Agents",
    prompt: "Deploy specialized AI teammates.",
    statement: "Not one generic chatbot.",
    description:
      "Define agents around specific workflows, responsibilities, decisions, boundaries, and measurable outcomes. Context Intelligence advises on agent strategy and orchestration; technology platforms provide the underlying capabilities.",
    listLabel: "Examples",
    items: ["Research agents", "Sales coaching agents", "Meeting-intelligence agents", "Customer-success agents", "Executive briefing agents", "Operations agents", "Content agents"],
    result: "An AI workforce that amplifies your team.",
  },
  {
    number: "06",
    slug: "adoption",
    title: "Adoption",
    prompt: "Lead the change.",
    statement: "Technology rarely fails alone.",
    description:
      "Equip, coach, measure, and reinforce so employees and leaders can confidently adopt new ways of working.",
    listLabel: "Adoption requires",
    items: ["Executive sponsorship", "Change management", "Training and enablement", "Reinforcement and coaching", "Measurement and feedback"],
    result: "Adoption that lasts.",
  },
  {
    number: "07",
    slug: "scale",
    title: "Scale",
    prompt: "Expand what works.",
    statement: "Continuously increase impact.",
    description:
      "Use demonstrated value, feedback, governance, and operating discipline to extend successful capabilities across additional workflows, departments, agents, knowledge sources, and business outcomes.",
    listLabel: "Scale by expanding",
    items: ["More workflows", "More departments", "More agents", "More context", "More business value"],
    result: "Compounding business value.",
  },
];

export const stageAccents = ["blue", "teal", "violet", "green", "orange", "gold", "deep-blue"] as const;
