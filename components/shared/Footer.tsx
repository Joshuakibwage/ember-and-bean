
import Link from "next/link";
import { SiInstagram, SiX } from "@icons-pack/react-simple-icons";

const BeanMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="9" ry="10" fill="currentColor" />
    <path d="M12 3.5c-2 3-2 5.5 0 8.5s2 5.5 0 8.5" stroke="var(--sidebar)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-sidebar-foreground">
              <BeanMark />
              <span className="font-script text-2xl tracking-wide">Ember &amp; Bean</span>
            </div>
            <p className="mt-3 max-w-[26ch] text-sm text-sidebar-foreground/70">
              Roasted in-house, twice a week. No shortcuts.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-sidebar-foreground/50">
              Menu
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/menu?category=coffee" className="text-sidebar-foreground/80 hover:text-sidebar-foreground">Coffee</Link></li>
              <li><Link href="/menu?category=pastry" className="text-sidebar-foreground/80 hover:text-sidebar-foreground">Pastries</Link></li>
              <li><Link href="/menu?category=cake" className="text-sidebar-foreground/80 hover:text-sidebar-foreground">Cake</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-sidebar-foreground/50">
              Visit
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/#location" className="text-sidebar-foreground/80 hover:text-sidebar-foreground">Location &amp; hours</Link></li>
              <li><a href="tel:+254700000000" className="text-sidebar-foreground/80 hover:text-sidebar-foreground">+254 700 000 000</a></li>
              <li><a href="mailto:hello@emberandbean.co.ke" className="text-sidebar-foreground/80 hover:text-sidebar-foreground">hello@emberandbean.co.ke</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-sidebar-foreground/50">
              Follow
            </h3>
            <div className="mt-4 flex gap-3">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ember & Bean on Instagram"
                    className="rounded-full border border-sidebar-border p-2 text-sidebar-foreground/80 transition-colors hover:border-sidebar-primary hover:text-sidebar-foreground"
                >
                    <SiInstagram size={16} />
                </a>
                <a href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ember & Bean on X"
                    className="rounded-full border border-sidebar-border p-2 text-sidebar-foreground/80 transition-colors hover:border-sidebar-primary hover:text-sidebar-foreground"
                >
                    <SiX size={16} />
                </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-dashed border-sidebar-border pt-6 text-xs text-sidebar-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ember &amp; Bean.</span>
          <span className="font-mono">Kilimani, Nairobi</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;