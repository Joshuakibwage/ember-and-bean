'use client';

import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/types/menuItem";

const AddToCartPanel = ({ item }: { item: MenuItem }) => {
    const [quantity, setQuantity] = useState(1);
    const [servedAs, setServedAs] = useState(item.servedAs?.[0]);
    const [justAdded, setJustAdded] = useState(false);

    const total = item.price * quantity;

    const handleAddToCart = () => {
      // TODO: replace with real cart context — addItem({ ...item, quantity, servedAs })
      console.log("Add to cart:", { slug: item.slug, quantity, servedAs });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    };

    return (
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl text-card-foreground">
            KSh {item.price}
          </span>
          {item.compareAtPrice && (
            <span className="font-mono text-sm text-muted-foreground line-through">
              KSh {item.compareAtPrice}
            </span>
          )}
        </div>

        {item.servedAs && item.servedAs.length > 1 && (
          <div className="mt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Served
            </span>
            <div className="mt-2 flex gap-2">
              {item.servedAs.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setServedAs(option)}
                  aria-pressed={servedAs === option}
                  className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
                    servedAs === option
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="p-2.5 text-muted-foreground hover:text-foreground disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-mono text-sm text-foreground" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              aria-label="Increase quantity"
              className="p-2.5 text-muted-foreground hover:text-foreground disabled:opacity-40"
              disabled={quantity >= 10}
            >
              <Plus size={14} />
            </button>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2 rounded-full">
            {justAdded ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              `Add to cart - KSh ${total}`
            )}
          </Button>
        </div>
      </div>
    );
};

export default AddToCartPanel;