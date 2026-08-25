"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/order";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const VALID_ROLES = ["user", "admin"] as const;

export async function updateUserRole(id: string, role: string) {
    if (!VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])) {
        throw new Error("Invalid role.");
    }

    const session = await auth();
    if (session?.user?.id === id && role !== "admin") {
        throw new Error("You can't remove your own admin access.");
    }

    await connectDB();
    await User.findByIdAndUpdate(id, { role });
    revalidatePath("/private/dashboard/customers");
}

export async function getCustomerOrderCounts(userIds: string[]) {
    await connectDB();
    const counts = await Order.aggregate([
        { $match: { user: { $in: userIds } } },
        { $group: { _id: "$user", count: { $sum: 1 }, totalSpent: { $sum: "$total" } } },
    ]);

    return new Map(counts.map((c) => [c._id.toString(), { count: c.count, totalSpent: c.totalSpent }]));
}