import { MousePointer2 } from "lucide-react";
import type { FeatureMock as FeatureMockKind } from "@/app/_data/landing";

/* Static, decorative stand-ins for each surface. They're hidden from assistive tech, since the
   row's title, description and bullets already say what the surface does. */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative aspect-4/3 w-full overflow-hidden rounded-xl border bg-card shadow-xl shadow-black/30"
    >
      {children}
    </div>
  );
}

function CanvasMock() {
  const node = "fill-secondary stroke-border";
  const label = "fill-foreground text-[11px] font-medium";
  const edge = "stroke-muted-foreground/60";

  return (
    <Frame>
      {/* Dot grid, like an infinite whiteboard */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px]" />
      <svg viewBox="0 0 400 300" className="relative size-full" fill="none">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 10 5 0 10z" className="fill-muted-foreground/60" />
          </marker>
        </defs>

        <path d="M200 64v32" className={edge} markerEnd="url(#arrow)" />
        <path d="M200 146v18" className={edge} markerEnd="url(#arrow)" />
        <path d="M150 190H96v34" className={edge} markerEnd="url(#arrow)" />
        <path d="M250 190h54v34" className={edge} markerEnd="url(#arrow)" />

        <rect x="150" y="30" width="100" height="34" rx="17" className={node} />
        <text x="200" y="51" textAnchor="middle" className={label}>Sign up</text>

        <rect x="140" y="98" width="120" height="46" rx="8" className="fill-accent stroke-primary" />
        <text x="200" y="125" textAnchor="middle" className="fill-accent-foreground text-[11px] font-medium">Verify email</text>

        <path d="M200 166l50 24-50 24-50-24z" className={node} />
        <text x="200" y="194" textAnchor="middle" className={label}>Valid?</text>

        <rect x="46" y="226" width="100" height="40" rx="8" className={node} />
        <text x="96" y="250" textAnchor="middle" className={label}>Onboarding</text>

        <rect x="254" y="226" width="100" height="40" rx="8" className={node} />
        <text x="304" y="250" textAnchor="middle" className={label}>Resend link</text>
      </svg>

      {/* The agent's selection on the node it just edited */}
      <div className="absolute top-[30%] left-[33%] h-[17%] w-[34%] rounded-md border border-dashed border-primary/70" />
      <span className="absolute top-[24%] left-[33%] rounded bg-primary px-1.5 py-0.5 font-mono text-[10px] text-primary-foreground">
        Agent
      </span>
    </Frame>
  );
}

function DocsMock() {
  return (
    <Frame>
      <div className="flex h-full flex-col gap-3 p-6 sm:p-8">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Spec · Sign-up flow</p>
        <p className="text-lg font-semibold">Email verification</p>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-2 w-11/12 rounded-full bg-muted" />
          <div className="h-2 w-3/4 rounded-full bg-muted" />
        </div>

        {/* The section the agent is rewriting */}
        <div className="relative mt-1 rounded-lg border border-primary/40 bg-accent/40 p-3">
          <span className="absolute -top-2.5 left-3 rounded bg-primary px-1.5 py-0.5 font-mono text-[10px] text-primary-foreground">
            Rewriting…
          </span>
          <div className="space-y-1.5 pt-1">
            <div className="h-2 w-full rounded-full bg-primary/30" />
            <div className="h-2 w-5/6 rounded-full bg-primary/30" />
          </div>
        </div>

        <ul className="space-y-2 pt-1">
          {["w-2/3", "w-1/2", "w-3/5"].map((w) => (
            <li key={w} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-muted-foreground/60" />
              <div className={`h-2 rounded-full bg-muted ${w}`} />
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

const columns = [
  { name: "Planning", cards: ["Pricing page", "Q3 roadmap"] },
  { name: "In progress", cards: ["Sign-up flow", "API schema", "Onboarding"] },
  { name: "Shipped", cards: ["Brand kit"] },
];

function BoardMock() {
  return (
    <Frame>
      <div className="grid h-full grid-cols-3 gap-3 p-4 sm:p-5">
        {columns.map((col) => (
          <div key={col.name} className="flex flex-col gap-2 rounded-lg bg-muted/50 p-2">
            <p className="flex items-center justify-between px-1 font-mono text-[10px] text-muted-foreground uppercase">
              {col.name}
              <span>{col.cards.length}</span>
            </p>
            {col.cards.map((card) => (
              <div
                key={card}
                className={`rounded-md border bg-card p-2 text-[11px] font-medium ${
                  card === "Sign-up flow" ? "border-primary/60" : ""
                }`}
              >
                {card}
                <div className="mt-2 h-1.5 w-2/3 rounded-full bg-muted" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Live cursors */}
      <div className="absolute top-[40%] left-[52%] flex items-start">
        <MousePointer2 className="size-4 fill-primary text-primary" />
        <span className="mt-3 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">Ana</span>
      </div>
      <div className="absolute top-[68%] left-[20%] flex items-start">
        <MousePointer2 className="size-4 fill-chart-3 text-chart-3" />
        <span className="mt-3 rounded bg-chart-3 px-1.5 py-0.5 text-[10px] font-medium text-foreground">Sam</span>
      </div>
    </Frame>
  );
}

export function FeatureMock({ kind }: { kind: FeatureMockKind }) {
  switch (kind) {
    case "canvas":
      return <CanvasMock />;
    case "docs":
      return <DocsMock />;
    case "board":
      return <BoardMock />;
  }
}
