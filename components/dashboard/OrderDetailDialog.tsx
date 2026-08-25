'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import StatusBadge from "./StatusBadge";
import OrderStatusSelect from "./OrderStatusSelect";
import type { OrderDetail } from "@/types/order";

const OrderDetailDialog = ({
  order,
  open,
  onOpenChange,
}: {
  order: OrderDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Order #{order._id.slice(-8).toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            {new Date(order.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <StatusBadge status={order.status} />
            <OrderStatusSelect orderId={order._id} currentStatus={order.status} />
          </div>

          <div className="rounded-xl border border-border p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Contact
            </h3>
            <p className="mt-1.5 text-sm text-card-foreground">{order.contact.fullName}</p>
            <p className="text-sm text-muted-foreground">{order.contact.phone}</p>
            <p className="text-sm text-muted-foreground">{order.contact.email}</p>
          </div>

          <div className="rounded-xl border border-border p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {order.fulfillment.method === "delivery" ? "Delivery to" : "Fulfillment"}
            </h3>
            <p className="mt-1.5 text-sm capitalize text-card-foreground">
              {order.fulfillment.method}
            </p>
            {order.fulfillment.method === "delivery" && order.fulfillment.address && (
              <>
                <p className="text-sm text-muted-foreground">{order.fulfillment.address.line1}</p>
                <p className="text-sm text-muted-foreground">{order.fulfillment.address.city}</p>
                {order.fulfillment.address.notes && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Note: {order.fulfillment.address.notes}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="rounded-xl border border-border">
            <h3 className="border-b border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Items
            </h3>
            <ul className="divide-y divide-border">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <span className="text-card-foreground">
                    {item.quantity}× {item.name}
                    {item.servedAs && <span className="text-muted-foreground"> ({item.servedAs})</span>}
                  </span>
                  <span className="font-mono text-card-foreground">
                    KSh {item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-medium">
              <span className="text-sm text-card-foreground">Total</span>
              <span className="font-mono text-sm text-card-foreground">KSh {order.total}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;