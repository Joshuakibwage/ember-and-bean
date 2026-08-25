"use server";

import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["pending", "paid", "preparing", "ready", "completed", "cancelled"] as const;

export async function updateOrderStatus(id: string, status: string) {
    if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
        throw new Error("Invalid status.");
    }

    await connectDB();
    await Order.findByIdAndUpdate(id, { status });
    revalidatePath("/private/dashboard/orders");
    revalidatePath("/private/dashboard"); // Overview's stats/charts read Order too
}