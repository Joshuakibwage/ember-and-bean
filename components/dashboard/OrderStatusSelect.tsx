'use client';

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/actions/orderAdmin";
import { Loader2 } from "lucide-react";

const STATUSES = ["pending", "paid", "preparing", "ready", "completed", "cancelled"];

const OrderStatusSelect = ({ orderId, currentStatus }: { orderId: string; currentStatus: string }) => {
    const [status, setStatus] = useState(currentStatus);
    const [isPending, startTransition] = useTransition();

    const handleChange = (next: string) => {
        setStatus(next); // optimistic — feels instant
        startTransition(async () => {
        try {
            await updateOrderStatus(orderId, next);
        } catch {
            setStatus(currentStatus); // revert on failure
        }
        });
    };

    return (
        <div className="flex items-center gap-2">
            <select
                value={status}
                onChange={(e) => handleChange(e.target.value)}
                disabled={isPending}
                className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm capitalize text-foreground disabled:opacity-60"
            >
                {STATUSES.map((s) => (
                    <option key={s} value={s} className="capitalize">
                        {s}
                    </option>
                ))}
            </select>
            {isPending && <Loader2 size={14} className="animate-spin text-muted-foreground" />}
        </div>
    );
};

export default OrderStatusSelect;