'use client';

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <div className="rounded-md bg-muted p-4">
          <ShoppingBag size={28} className="text-muted-foreground" />
        </div>
        <h1 className="mt-5 font-heading text-2xl text-foreground">Your cart is empty.</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Nothing here yet the menu has a few things worth fixing that.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl text-foreground">Your cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="flex flex-col divide-y divide-border">
          {items.map((item) => {
            const key = `${item.slug}-${item.servedAs ?? "default"}`;
            return (
              <li key={key} className="flex gap-4 py-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading text-base text-foreground">{item.name}</h2>
                      {item.servedAs && (
                        <span className="mt-0.5 inline-block font-mono text-xs capitalize text-muted-foreground">
                          {item.servedAs}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="p-2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center font-mono text-sm text-foreground" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="p-2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span className="font-mono text-sm text-foreground">
                      KSh {item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-md border border-border bg-card p-5">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Order summary
          </h2>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-mono text-base text-card-foreground">KSh {subtotal}</span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Taxes calculated at checkout.
          </p>

          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Checkout
            <ArrowRight
              size={16}
              className="transition-transform delay-200 ease-out group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/menu"
            className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Continue browsing
          </Link>
        </aside>
      </div>
    </div>
  );
}