"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/user";

type NavUser = {
  firstName: string;
  role: "user" | "admin";
} | null;

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Nav = ({ user }: { user: NavUser }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `text-sm transition-colors ${
      isActive(href)
        ? "font-medium text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden items-center gap-8 md:flex">
        {publicLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={linkClass(link.href)}
          >
            {link.label}
          </Link>
        ))}

        {!user ? (
          <>
            <Link href="/login" className={linkClass("/login")}>
              Log in
            </Link>

            <Button asChild size="sm" className="rounded-full">
              <Link href="/register">Sign up</Link>
            </Button>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <Link
                href="/private/dashboard"
                className={linkClass("/private/dashboard")}
              >
                Dashboard
              </Link>
            )}

            <Link href="/profile" className={linkClass("/profile")}>
              Hi, {user.firstName}
            </Link>

            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm">
                Log out
              </Button>
            </form>
          </>
        )}
      </div>

      {/* Mobile button */}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className="rounded-md p-2 text-foreground hover:bg-muted md:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
        >
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-border" />

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-primary hover:bg-muted"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/private/dashboard"
                    className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/profile"
                  className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  Profile
                </Link>

                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full rounded-md px-3 py-2.5 text-left text-sm text-foreground hover:bg-muted"
                  >
                    Log out
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;