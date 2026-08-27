import React from 'react';
import Link from "next/link";
import Image from "next/image";
import type { FeaturedItem } from "@/components/sections/FeaturedMenu";

type MenuGridProps = {
  items: FeaturedItem[];
};

const MenuGrid = ({ items }: MenuGridProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border-border-dashed border-border py-20 text-center">
        <p className="font-heading text-xl text-foreground">
          Nothing matches those filters.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try clearing a filter or two.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>

          <div className="p-5">
            <div className="flex items-baseline gap-2">
              <h3 className="font-heading text-lg text-card-foreground">{item.name}</h3>
              <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-border" />
              <span className="font-mono text-sm text-card-foreground">
                KSh {item.price}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuGrid;