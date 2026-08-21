
type Testimonial = {
  quote: string;
  name: string;
  detail: string; 
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The oat latte ruined every other oat latte for me. I've stopped even pretending to try other places.",
    name: "Amina W.",
    detail: "Regular since 2025",
  },
  {
    quote:
      "First place in Nairobi where the croissant actually shatters. Worth the walk from Yaya.",
    name: "Brian K.",
    detail: "Upper hill",
  },
  {
    quote:
      "I've ordered the same thing eleven times and they still ask if I want it the usual way. That's the whole review.",
    name: "John M.",
    detail: "Regular since 2025",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-md">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
            From the regulars
          </span>
          <h2 className="mt-3 font-heading text-3xl leading-tight text-foreground sm:text-4xl">
            Word of mouth, mostly.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
            >
              <blockquote className="font-heading text-lg leading-snug text-card-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-dashed border-border pt-4">
                <span className="block text-sm font-medium text-card-foreground">
                  {t.name}
                </span>
                <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {t.detail}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;