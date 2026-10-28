import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Heart } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { FeatureMock } from "@/components/landing/FeatureMocks";
import {
  audience,
  closingCta,
  features,
  footer,
  hero,
  howItWorks,
  pricing,
} from "./_data/landing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingTable } from "@clerk/nextjs";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
      <span aria-hidden className="size-1.5 rotate-45 bg-primary" />
      {children}
    </p>
  );
}

const PRICING_TAB =
  "rounded-full px-5 py-1.5 data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="topo-bg flex flex-col items-center px-6 pt-16 pb-24 text-center sm:pt-24 sm:pb-32">
        <Eyebrow>{hero.eyebrow}</Eyebrow>

        <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
          {hero.headline.before}
          <span className="text-primary">{hero.headline.highlight}</span>
          {hero.headline.after}
        </h1>

        <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-11 px-5 text-base">
            <Link href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 px-5 text-base"
          >
            <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
          </Button>
        </div>

        {/* survey-frame sits on the wrapper because the card's overflow-hidden would clip the marks */}
        <div className="survey-frame scroll-tilt mt-16 w-full max-w-7xl sm:mt-20">
          <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/40">
            <video
              className="aspect-video w-full object-cover"
              poster={hero.video.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={hero.video.label}
            >
              {hero.video.sources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
          </div>
        </div>
      </section>

      <section className="border-y bg-card/40 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {audience.label}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium sm:text-base">
            {audience.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rotate-45 bg-primary/70" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="features" className="scroll-mt-40 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{features.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {features.title}
            </h2>
          </div>

          <div className="mt-20 flex flex-col gap-24 sm:mt-24 sm:gap-32">
            {features.items.map((feature, i) => (
              <div
                key={feature.title}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <div className={cn(i % 2 === 1 && "md:order-last")}>
                  <span className="flex size-10 items-center justify-center rounded-lg border bg-accent text-primary">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-pretty text-muted-foreground">
                    {feature.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <FeatureMock kind={feature.mock} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-40 border-t px-6 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {howItWorks.title}
            </h2>
          </div>

          {/* Steps are waypoints on a route: diamond markers joined by a dashed line, vertical on
              phones and horizontal from md up. The last waypoint is filled in as the destination. */}
          <ol className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {howItWorks.steps.map((step, i) => {
              const isLast = i === howItWorks.steps.length - 1;
              return (
                <li
                  key={step.title}
                  className="relative flex gap-6 md:flex-col"
                >
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute top-14 -bottom-8 left-5 border-l border-dashed border-primary/50 md:top-5 md:right-0 md:bottom-auto md:left-14 md:-mr-6 md:border-t md:border-l-0"
                    />
                  )}
                  <span
                    aria-hidden
                    className={cn(
                      "relative flex size-10 shrink-0 items-center justify-center",
                      "before:absolute before:inset-1 before:rotate-45 before:rounded-sm before:border before:border-primary",
                      isLast
                        ? "text-primary-foreground before:bg-primary"
                        : "text-primary before:bg-background",
                    )}
                  >
                    <span className="relative font-mono text-xs font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <div>
                    <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                      Waypoint {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-pretty text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="pricing"
        className="scroll-mt-40 border-t px-6 py-24 sm:py-32"
      >
        <Tabs
          defaultValue="user"
          className="mx-auto max-w-5xl items-center gap-10"
        >
          <TabsList className="h-auto rounded-full border border-white/10 bg-white/10 p-1">
            <TabsTrigger value="user" className={PRICING_TAB}>
              Personal
            </TabsTrigger>
            <TabsTrigger value="organization" className={PRICING_TAB}>
              Team
            </TabsTrigger>
          </TabsList>
          <TabsContent value="user" className="w-full">
            <PricingTable for="user" />
          </TabsContent>
          <TabsContent value="organization" className="w-full">
            <PricingTable for="organization" />
          </TabsContent>
        </Tabs>
      </section>

      <section className="topo-bg flex flex-col items-center border-t px-6 py-24 text-center sm:py-32">
        <Image
          src={closingCta.mascot.src}
          alt={closingCta.mascot.alt}
          width={120}
          height={120}
          className="size-24 sm:size-28"
        />
        <h2 className="mt-8 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {closingCta.title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-pretty text-muted-foreground">
          {closingCta.subtitle}
        </p>
        <Button asChild size="lg" className="mt-10 h-11 px-5 text-base">
          <Link href={closingCta.cta.href}>
            {closingCta.cta.label}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </section>

      <footer className="border-t px-6 py-8">
        <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          Made with
          <Heart
            aria-label="love"
            className="size-4 fill-primary text-primary"
          />
          by {footer.madeBy}
        </p>
      </footer>
    </main>
  );
}
