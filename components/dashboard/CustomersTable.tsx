'use client';

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import PromoteUserDialog from "./PromoteUserDialog";
import type { Customer } from "@/types/customer";

const CustomersTable = ({ customers }: { customers: Customer[] }) => {
  const [target, setTarget] = useState<Customer | null>(null);

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground">Customers</h1>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Name</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Email</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Orders</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Spent</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Role</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                  No customers yet.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-3 text-card-foreground">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-5 py-3 text-card-foreground">{c.orderCount}</td>
                  <td className="px-5 py-3 font-mono text-card-foreground">KSh {c.totalSpent}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
                        c.role === "admin"
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setTarget(c)}
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <ShieldCheck size={14} />
                      {c.role === "admin" ? "Remove admin" : "Make admin"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {target && (
        <PromoteUserDialog
          open={!!target}
          onOpenChange={(open) => !open && setTarget(null)}
          userId={target.id}
          userName={`${target.firstName} ${target.lastName}`}
          currentRole={target.role}
        />
      )}
    </div>
  );
};

export default CustomersTable;