'use client';

import Link from "next/link";
import { Settings, LogOut, User as UserIcon } from "lucide-react";
import { logout } from "@/actions/user";

type Props = {
  firstName: string;
  email: string;
  collapsed: boolean;
};

const SidebarUserMenu = ({ firstName, email, collapsed }: Props) => {
    const initial = firstName?.charAt(0).toUpperCase() ?? "?";

    return (
        <div className="border-t border-sidebar-border px-3 py-3">
            <div className={`flex items-center gap-2.5 rounded-lg px-2 py-2 ${collapsed ? "justify-center" : ""}`}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent font-mono text-xs font-medium text-sidebar-accent-foreground">
                    {initial}
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <p className="truncate text-sm text-sidebar-foreground">{firstName}</p>
                        <p className="truncate text-xs text-sidebar-foreground/50">{email}</p>
                    </div>
                )}
            </div>

            <div className="mt-1 flex flex-col gap-0.5">
                <Link
                    href="/profile"
                    title={collapsed ? "Profile" : undefined}
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground ${
                        collapsed ? "justify-center" : ""
                    }`}
                >
                    <UserIcon size={15} className="shrink-0" />
                    {!collapsed && "Profile"}
                </Link>
                <Link
                    href="/private/dashboard/settings"
                    title={collapsed ? "Settings" : undefined}
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground ${
                        collapsed ? "justify-center" : ""
                    }`}
                >
                    <Settings size={15} className="shrink-0" />
                    {!collapsed && "Settings"}
                </Link>
                <form action={logout}>
                    <button
                        type="submit"
                        title={collapsed ? "Log out" : undefined}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive ${
                        collapsed ? "justify-center" : ""
                        }`}
                    >
                        <LogOut size={15} className="shrink-0" />
                        {!collapsed && "Log out"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SidebarUserMenu;