// components/featured-menu.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type FeaturedItem = {
  id: string;
  slug: string;
  name: string;
  price: string;
  description: string;
  imageSrc: string;
  tag?: string;
};

type FeaturedMenuProps = {
  items: FeaturedItem[];
};

const FeaturedMenu = ({ items }: FeaturedMenuProps) => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
              Signature drinks
            </span>
            <h2 className="mt-3 font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              Today&apos;s pours.
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Four we&apos;d put in front of anyone who asks where to start.
            </p>
          </div>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary"
          >
            View full menu
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item._id}
              href={`/menu/${item.slug}`}
              className="group rounded-md border border-border bg-card outline-none ring-ring ring-offset-2 ring-offset-background transition-shadow hover:shadow-lg focus-visible:ring-2"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-t-md">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-card-foreground backdrop-blur-sm">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-heading text-lg text-card-foreground">
                    {item.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mb-1 flex-1 border-b border-dotted border-border"
                  />
                  <span className="font-mono text-sm text-card-foreground">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;