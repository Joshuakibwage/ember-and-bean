"use server";

import connectDB from "@/lib/db";
// import MenuItem from "@/models/MenuItem";
import Order from "@/models/order";
import User from "@/models/User";




export async function getDashboardStats() {

    await connectDB();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [todayOrders, pendingOrders, totalCustomers, recentOrders, todayRevenue] =

        await Promise.all([
        Order.countDocuments({ createdAt: { $gte: startOfToday } }),
        Order.countDocuments({ status: { $in: ["pending", "paid", "preparing"] } }),
        User.countDocuments({ role: "user" }),
        Order.find().sort({ createdAt: -1 }).limit(6).lean(),
        Order.aggregate([
            { $match: { createdAt: { $gte: startOfToday }, status: { $ne: "cancelled" } } },
            { $group: { _id: null, total: { $sum: "$total" } } },
        ]),
    ]);

    return {
        todayOrders,
        pendingOrders,
        totalCustomers,
        todayRevenue: todayRevenue[0]?.total ?? 0,
        recentOrders: JSON.parse(JSON.stringify(recentOrders)),
    };
}

export async function getChartData() {

    await connectDB();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [revenueByDay, ordersByStatus, topItems] = await Promise.all([
        Order.aggregate([

            { $match: { createdAt: { $gte: sevenDaysAgo }, status: { $ne: "cancelled" } } },
            {
                $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                revenue: { $sum: "$total" },
                },
            },
            { $sort: { _id: 1 } },
            ]),

            Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),

            Order.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items.name", quantity: { $sum: "$items.quantity" } } },
            { $sort: { quantity: -1 } },
            { $limit: 5 },
        ]),
    ]);

    const revenueMap = new Map(revenueByDay.map((r) => [r._id, r.revenue]));

    const filledRevenue = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(sevenDaysAgo);
        date.setDate(date.getDate() + i);
        const key = date.toISOString().slice(0, 10);
        return {
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            revenue: revenueMap.get(key) ?? 0,
        };
    });

    return {
        revenueByDay: filledRevenue,
        ordersByStatus: ordersByStatus.map((s) => ({ status: s._id, count: s.count })),
        topItems: topItems.map((t) => ({ name: t._id, quantity: t.quantity })),
    };
}