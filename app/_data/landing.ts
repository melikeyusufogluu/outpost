import { KanbanSquare, FileText, Shapes, type LucideIcon } from "lucide-react";

export const hero = {
  eyebrow: "Early access",
  // Split around the highlighted word so the page can color it without parsing the string
  headline: { before: "An", highlight: "outpost", after: "for whatever you're building" },
  subtitle:
    "Docs, sketches, and plans in one shared workspace, so you and your team can map out new territory without losing the thread.",
  primaryCta: { label: "Start building free", href: "/sign-up" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  video: {
    poster: "/videos/hero-poster.jpg",
    sources: [
      { src: "/videos/hero.webm", type: "video/webm" },
      { src: "/videos/hero.mp4", type: "video/mp4" },
    ],
    label: "Outpost product demo",
  },
};

export const audience = {
  label: "Built for",
  items: ["Product teams", "Founders", "Solo builders", "Agencies", "Consultants"],
};

export type FeatureMock = "canvas" | "docs" | "board";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: [string, string, string];
  mock: FeatureMock;
};

export const features: {
  eyebrow: string;
  title: string;
  items: Feature[];
} = {
  eyebrow: "Features",
  title: "One agent, one workspace, your whole team",
  items: [
    {
      icon: Shapes,
      title: "Canvas",
      description:
        "An infinite whiteboard where the agent draws flowcharts, ERDs, architecture diagrams and org charts shape by shape, and edits them in place when you ask.",
      bullets: [
        "Describe a system and watch it get drawn",
        "Ask for changes without redrawing from scratch",
        "Move, restyle and connect shapes by hand anytime",
      ],
      mock: "canvas",
    },
    {
      icon: FileText,
      title: "Docs",
      description:
        "A block editor where the agent turns a diagram into a written spec, and rewrites or summarizes sections on command.",
      bullets: [
        "Turn any diagram into a first-draft spec",
        "Rewrite or summarize a single section",
        "Headings, lists, tables and code blocks built in",
      ],
      mock: "docs",
    },
    {
      icon: KanbanSquare,
      title: "Team board",
      description:
        "A kanban board of every workspace in your org, with live cursors so teammates can jump in together.",
      bullets: [
        "See every workspace in your org at a glance",
        "Drag work between stages as it moves",
        "Live cursors show who's in what, right now",
      ],
      mock: "board",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "From a sentence to a shared plan",
  steps: [
    {
      title: "Describe it",
      description:
        "Tell the agent what you're building in plain words: a sign-up flow, a database, the org chart for a new team.",
    },
    {
      title: "Watch the agent draw",
      description:
        "It lays out the diagram on the canvas shape by shape, then turns it into a written spec when you're ready.",
    },
    {
      title: "Keep iterating together",
      description:
        "Ask for changes, edit by hand, and bring teammates in. Everyone works on the same map in real time.",
    },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  title: "Free while we're in early access",
  description: "Plans and pricing are on the way. Everyone who joins now starts free.",
};

export const closingCta = {
  title: "Ready to set up camp?",
  subtitle: "Start your first workspace free while Outpost is in early access.",
  cta: { label: "Start building free", href: "/sign-up" },
  mascot: { src: "/brand/mascot-dark.png", alt: "The Outpost mascot" },
};

export const footer = {
  madeBy: "Melike",
};
