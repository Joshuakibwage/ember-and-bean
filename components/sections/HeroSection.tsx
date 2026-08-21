import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";


type HeroProps = {
  imageSrc: string;
  imageAlt?: string;
};

const HeroSection = ({ imageSrc, imageAlt = "Inside Ember & Bean" }: HeroProps) => {
  return (
    <section className="relative flex min-h-[92vh] w-full flex-col justify-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
      />

      {/* legibility gradient — bottom-anchored, fades up */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
      />
      <div className={cn(
          "relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-14 pt-2 sm:px-6 ",
          "md:flex-row md:items-end md:justify-between md:pb-16"
        )}
      >
        <div className={cn(
          "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 ",
          "motion-safe:duration-700 max-w-xl"
        )}>

          <h1 className="mt-5 font-heading text-4xl leading-[1.08] text-primary-foreground sm:text-5xl md:text-6xl">
            Every batch, roasted in-house.
            <br />
            Every cup, made to order.
          </h1>

          <p className="mt-4 max-w-md text-base text-primary-foreground/80">
            No syrups, no shortcuts just beans we roast ourselves twice a
            week, and pull to order behind the counter.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="rounded-md text-lg px-3 py-6"
              nativeButton={false}
              render={
                <Link href="/menu" className="flex items-center gap-2">
                  View the menu
                  <ArrowRight size={16} className="ml-1.5" />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              className="rounded-md border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-lg py-6 px-3"
              nativeButton={false}
              render={<Link href="/about#location">Find us</Link>}
            />
          </div>
        </div>

        {/* status ticket — continues the ticket motif from auth/nav */}
        <div className={cn(
          "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:delay-200 relative",
          "shrink-0 rounded-md bg-card/95 px-5 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm"
        )}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Open today
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-card-foreground">
            7:00 AM - 6:00 PM
          </p>
          <div className="mt-2 border-t border-dashed border-border pt-2 font-mono text-xs text-muted-foreground">
            Kilimani, Nairobi
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;