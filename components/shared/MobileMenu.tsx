'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { logout } from "@/actions/user";
import { publicLinks } from "./NavLinks";

type NavUser = { firstName: string; role: "user" | "admin" } | null;

const MobileMenu = ({ user }: { user: NavUser }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen((prev) => (prev ? false : prev));
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-md p-2 text-foreground hover:bg-muted"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div id="mobile-nav" className="absolute inset-x-0 top-full border-b border-border bg-background">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {publicLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted">
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-border" />

            {!user ? (
              <>
                <Link href="/login" className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted">
                  Log in
                </Link>
                <Link href="/register" className="rounded-md px-3 py-2.5 text-sm font-medium text-primary hover:bg-muted">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <Link href="/private/dashboard" className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted">
                    Dashboard
                  </Link>
                )}
                <Link href="/profile" className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted">
                  Profile
                </Link>
                <form action={logout}>
                  <button type="submit" className="w-full rounded-md px-3 py-2.5 text-left text-sm text-foreground hover:bg-muted">
                    Log out
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;