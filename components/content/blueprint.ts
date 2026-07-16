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
    prompt: "Where are we going?",
    description:
      "Define what AI-enabled success should look like three to five years from now. Align the organization around measurable business outcomes before selecting technology.",
    listLabel: "Potential outcomes",
    items: ["Revenue growth", "Operational excellence", "Customer experience", "Employee productivity", "Competitive advantage"],
    result: "A clear destination that guides every AI decision.",
  },
  {
    number: "02",
    slug: "processes",
    title: "Processes",
    prompt: "What does the business do repeatedly?",
    description:
      "Identify the high-frequency, high-impact processes where repetition creates leverage and where improved execution can generate meaningful business value.",
    listLabel: "Examples",
    items: ["Customer interactions", "Sales execution", "Decision-making", "Knowledge transfer", "Operational handoffs", "Administrative work"],
    result: "A focused pipeline of transformation opportunities—not an unstructured list of AI ideas.",
  },
  {
    number: "03",
    slug: "context",
    title: "Context",
    prompt: "Context is everything.",
    description:
      "Generic AI understands the world. Enterprise AI must understand your business. Identify the organizational knowledge AI requires to produce reliable, relevant results.",
    listLabel: "Business context includes",
    items: ["Customers", "Products and services", "Processes and policies", "Terminology", "Historical decisions", "Documents and meeting knowledge", "Tribal knowledge", "Business systems and operating rules"],
    result: "More reliable answers, better decisions, stronger trust, and a durable competitive advantage.",
  },
  {
    number: "04",
    slug: "workflows",
    title: "AI-Enabled Workflows",
    prompt: "Redesign how work gets done.",
    statement: "Do not simply automate tasks.",
    description:
      "Combine people, organizational context, AI, business rules, and systems into workflows that improve complete outcomes rather than accelerating isolated activities.",
    listLabel: "Example areas",
    items: ["Sales", "Marketing", "Customer success", "Operations", "Finance", "Human resources", "Leadership"],
    result: "Work gets done faster, better, and more consistently.",
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
    result: "An AI workforce that amplifies employees and improves specific business workflows.",
  },
  {
    number: "06",
    slug: "adoption",
    title: "Adoption",
    prompt: "Make the change durable.",
    statement: "Technology rarely fails alone.",
    description:
      "Build leadership ownership, change management, training, reinforcement, measurement, feedback, and employee confidence into the transformation from the beginning.",
    listLabel: "Adoption requires",
    items: ["Executive sponsorship", "Change management", "Training and enablement", "Reinforcement and coaching", "Measurement and feedback"],
    result: "Employees embrace the transformation and new ways of working become durable.",
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
    result: "Enterprise-wide transformation and a compounding competitive advantage.",
  },
];

export const stageAccents = ["blue", "teal", "violet", "green", "orange", "gold", "deep-blue"] as const;
