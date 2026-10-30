export const audiences = [
  {
    id: "enterprise",
    label: "Enterprise",
    href: "/",
    description: "AI transformation for organizations where scale makes inefficiency expensive.",
  },
  {
    id: "local",
    label: "Local Business",
    href: "/local-business",
    description: "Practical systems, automation and AI that take work off the owner's plate.",
  },
  {
    id: "creators",
    label: "Creators (Context Ready)",
    href: "/context-ready",
    description: "Turn expertise and audiences into products people can buy.",
  },
] as const;

export type AudienceId = (typeof audiences)[number]["id"];
