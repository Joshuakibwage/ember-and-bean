import Link from "next/link";
import { auth } from "@/auth";
import NavLinks from "@/components/shared/NavLinks";
import AuthActions from "@/components/shared/AuthActions";
import MobileMenu from "@/components/shared/MobileMenu";
import CartIcon from "@/components/CartIcon";

const BeanMark = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="9" ry="10" fill="currentColor" />
    <path d="M12 3.5c-2 3-2 5.5 0 8.5s2 5.5 0 8.5" stroke="var(--background)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const Navbar = async () => {
  const session = await auth();
  const user = session?.user
    ? { firstName: session.user.firstName, role: session.user.role }
    : null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="container relative mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <BeanMark />
            <span className="font-script text-2xl leading-none tracking-wide md:text-3xl">
              Ember &amp; Bean
            </span>
          </Link>

          <div className="flex justify-center">
            <NavLinks />
          </div>

          <div className="flex items-center justify-end gap-2">
            <CartIcon />
            <AuthActions user={user} />
            <MobileMenu user={user} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;