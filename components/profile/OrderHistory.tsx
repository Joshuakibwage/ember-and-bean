
import Link from "next/link";
import { Package } from "lucide-react";

type OrderSummary = {
    _id: string;
    items: { name: string; quantity: number }[];
    total: number;
    status: string;
    createdAt: string;
};

const statusStyles: Record<string, string> = {
    pending: "bg-muted text-muted-foreground",
    paid: "bg-accent text-accent-foreground",
    preparing: "bg-accent text-accent-foreground",
    ready: "bg-primary/15 text-primary",
    completed: "bg-primary/15 text-primary",
    cancelled: "bg-destructive/10 text-destructive",
};

const OrderHistory = ({ orders }: { orders: OrderSummary[] }) => {
    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
                <Package size={22} className="text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">No orders yet.</p>
                <Link href="/menu" className="mt-2 text-sm font-medium text-primary hover:underline">
                    Browse the menu
                </Link>
            </div>
        );
    }

    return (
        <ul className="divide-y divide-border">
            {orders.map((order) => (
                <li key={order._id} className="flex items-center justify-between gap-4 py-4">
                    <div>
                        <p className="font-mono text-xs text-muted-foreground">
                            #{order._id.slice(-8).toUpperCase()} ·{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                            {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                        </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span
                            className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
                                statusStyles[order.status] ?? "bg-muted text-muted-foreground"
                            }`}
                        >
                            {order.status}
                        </span>
                        <span className="font-mono text-sm text-foreground">KSh {order.total}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default OrderHistory;