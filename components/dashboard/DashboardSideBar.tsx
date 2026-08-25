'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Coffee, Receipt, Users, PanelLeftClose, PanelLeft, Inbox } from "lucide-react";

const navItems = [
  { href: "/private/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/private/dashboard/menu", label: "Menu", icon: Coffee },
  { href: "/private/dashboard/orders", label: "Orders", icon: Receipt },
  { href: "/private/dashboard/customers", label: "Customers", icon: Users },
  { href: "/private/dashboard/inbox", label: "Inbox", icon: Inbox }
];

const DashboardSidebar = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={`hidden h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 sm:flex ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-6">
        {!collapsed && (
          <div>
            <span className="font-script text-xl text-sidebar-foreground">Ember &amp; Bean</span>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/50">
              Admin
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-md p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/private/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;