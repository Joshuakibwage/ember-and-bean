
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-primary/60 py-20 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground/70">
          Ready when you are
        </span>
        <h2 className="mt-4 font-heading text-3xl leading-tight text-primary-foreground sm:text-4xl">
          Skip the queue. Order ahead.
        </h2>
        <p className="mt-3 max-w-md text-sm text-primary-foreground/80">
          Have it ready by the time you walk in pickup or delivery, your call.
        </p>
        <Button
          size="lg"
          className="mt-7 gap-2 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          nativeButton={false}
          render={
            <Link href="/menu">
              Start an order
              <ArrowRight size={16} />
            </Link>
          }
        />
      </div>
    </section>
  );
};

export default CallToAction;