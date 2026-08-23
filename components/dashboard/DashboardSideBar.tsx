"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Coffee, Receipt, Users, MessageCircleMore  } from "lucide-react";



const navItems = [
  { href: "/private/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/private/dashboard/menu", label: "Menu", icon: Coffee },
  { href: "/private/dashboard/orders", label: "Orders", icon: Receipt },
  { href: "/private/dashboard/customers", label: "Customers", icon: Users },
  { href: "/private/dashboard/messages", label: "Messages", icon: MessageCircleMore },
];


const DashboardSideBar = () => {

    const pathname = usePathname();

    return (
        <aside className="hidden w-56 shrink-0 border-r border-sidebar-border bg-sidebar sm:block">
            <div className="px-5 py-6">
                <span className="font-script text-xl text-sidebar-foreground">Ember &amp; Bean</span>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/50">
                    Admin
                </p>
            </div>

            <nav className="flex flex-col gap-1 px-3">
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
                            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                                isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                            }`}
                        >
                            <Icon size={16} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    )
}

export default DashboardSideBar
