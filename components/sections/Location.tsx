// components/sections/Location.tsx
import { Clock, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const hours = [
  { day: "Mon - Fri", time: "7:00 AM - 6:00 PM" },
  { day: "Saturday", time: "8:00 AM - 6:00 PM" },
  { day: "Sunday", time: "9:00 AM - 4:00 PM" },
];

const Location = () => {
  return (
    <section id="location" className="scroll-mt-20 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
          Visit us
        </span>
        <h2 className="mt-3 font-heading text-3xl leading-tight text-foreground sm:text-4xl">
          Kilimani, Nairobi.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col justify-between rounded-md border border-border bg-card p-6">
            <div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Argwings Kodhek Road
                  </p>
                  <p className="text-sm text-muted-foreground">Kilimani, Nairobi</p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                <div className="space-y-1.5">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-6 text-sm">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-mono text-card-foreground">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-7 gap-2 rounded-md"
              nativeButton={false}
              render={
                <a
                  href="https://maps.google.com/?q=Argwings+Kodhek+Road+Kilimani+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                  <Navigation size={16} />
                </a>
              }
            />
          </div>

          <div className="overflow-hidden rounded-md border border-border">
            <iframe
              title="Ember & Bean location"
              src="https://maps.google.com/maps?q=Argwings%20Kodhek%20Road%2C%20Kilimani%2C%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[320px] w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;