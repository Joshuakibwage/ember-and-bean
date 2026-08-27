'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/user";

type NavUser = { firstName: string; role: "user" | "admin" } | null;

const AuthActions = ({ user }: { user: NavUser }) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `text-sm transition-colors ${
      isActive(href) ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  if (!user) {
    return (
      <div className="hidden items-center gap-4 md:flex">
        <Link href="/login" className={linkClass("/login")}>
          Log in
        </Link>
        <Button
          size="sm"
          className="rounded-full"
          nativeButton={false}
          render={<Link href="/register">Sign up</Link>}
        />
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-4 md:flex">
      {user.role === "admin" && (
        <Link href="/private/dashboard" className={linkClass("/private/dashboard")}>
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
    </div>
  );
};

export default AuthActions;