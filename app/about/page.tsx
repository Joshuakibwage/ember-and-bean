// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — Ember & Bean",
  description: "Roasted in-house in Kilimani, Nairobi. No shortcuts.",
};

const facts = [
  { label: "Founded", value: "2025" },
  { label: "Roasted", value: "Twice weekly" },
  { label: "Location", value: "Kilimani, Nairobi" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
          Our story
        </span>
        <h1 className="mt-4 font-heading text-4xl leading-[1.1] text-foreground sm:text-5xl">
          Coffee, the slow way.
        </h1>
      </div>

      <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden rounded-md border border-border sm:aspect-[16/9]">
        <Image
          src="/about.jpg"
          alt="Inside Ember & Bean"
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-14 max-w-xl space-y-6 text-base leading-relaxed text-foreground">
        <p>
          We started Ember & Bean because we couldn&apos;t find a place in
          Kilimani that roasted its own beans and actually meant it. Not a
          bag shipped in from somewhere else with a house label stuck on it,
          roasted here, twice a week, in small enough batches that we notice
          when something&apos;s off.
        </p>
        <p>
          That&apos;s most of what this place is. A counter, a roaster in the
          back, and the belief that a good cup doesn&apos;t need much
          explaining once it&apos;s in front of you.
        </p>
        <p className="font-script text-3xl leading-tight text-primary">
          No syrups, no shortcuts.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-3 divide-x divide-border border-y border-border py-6">
        {facts.map((fact) => (
          <div key={fact.label} className="px-4 text-center first:pl-0 last:pr-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {fact.label}
            </p>
            <p className="mt-1.5 font-heading text-lg text-foreground">
              {fact.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <Button
          size="lg"
          className="rounded-md"
          nativeButton={false}
          render={<Link href="/menu">See the menu</Link>}
        />
      </div>
    </div>
  );
}