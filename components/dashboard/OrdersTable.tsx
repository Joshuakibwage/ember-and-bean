'use client';

import { useState } from "react";
import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import OrderDetailDialog from "./OrderDetailDialog";
import type { OrderDetail } from "@/types/order";

const OrdersTable = ({ orders }: { orders: OrderDetail[] }) => {
  const [selected, setSelected] = useState<OrderDetail | null>(null);

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground">Orders</h1>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Order</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Customer</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Fulfillment</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Total</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-5 py-3 text-card-foreground">{order.contact.fullName}</td>
                  <td className="px-5 py-3 capitalize text-muted-foreground">
                    {order.fulfillment.method}
                  </td>
                  <td className="px-5 py-3 font-mono text-card-foreground">KSh {order.total}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setSelected(order)}
                      aria-label={`View order #${order._id.slice(-8)}`}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrderDetailDialog
        order={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  );
};

export default OrdersTable;