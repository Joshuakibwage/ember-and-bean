'use client';

import { useState, type ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSideBar";

type ShellUser = { firstName: string; email: string };

const DashboardShell = ({ children, user }: { children: ReactNode; user: ShellUser }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} user={user} />
      <main className="flex-1 overflow-y-auto bg-background px-6 py-8 sm:px-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;