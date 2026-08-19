
'use client';

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cartContext";

const CartIcon = () => {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className="relative rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ShoppingBag size={20} />
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[10px] font-medium text-primary-foreground"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;