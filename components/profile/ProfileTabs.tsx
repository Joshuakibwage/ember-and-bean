"use client";
import React, { useState, type ReactNode } from 'react';

const tabs = [
    { id: "account", label: "Account"},
    { id: "orders", label: "Orders"}
];
type TabId = (typeof tabs)[number]["id"];

const ProfileTabs = ({
    accountContent,
    ordersContent
}: { accountContent: ReactNode; ordersContent: ReactNode; }) => {

    const [ active, setActive ] = useState<TabId>("account");

  return (
    <div className="mt-8">
        <div role="tablist"  className="flex gap-1 border-b border-border">
            {
                tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={active === tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                            active === tab.id 
                            ? "border-b-2 border-primary text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`
                        }
                    >
                        {tab.label}
                    </button>
                ))
            }
        </div>

        <div role="tabpanel" className="pt-6">
            { active === "account" ? accountContent : ordersContent }
        </div>
    </div>
  )
}

export default ProfileTabs
