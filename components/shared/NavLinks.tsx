'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const NavLinks = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden items-center gap-8 md:flex">
      {publicLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(link.href) ? "page" : undefined}
          className={`text-sm transition-colors ${
            isActive(link.href)
              ? "font-medium text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
export { publicLinks };