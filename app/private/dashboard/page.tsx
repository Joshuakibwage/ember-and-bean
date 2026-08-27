
import { getDashboardStats, getChartData } from "@/actions/dashboard";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatusChart from "@/components/dashboard/StatusChart";
import TopItemsChart from "@/components/dashboard/TopItemsChart";
import { Coffee, Clock, Users, Wallet } from "lucide-react";
import Link from "next/link";
import Greeting from "@/components/dashboard/Greetings";
import { auth } from "@/auth";

type RecentOrder = {
  _id: string;
  total: number;
  status: string;
  contact: { fullName: string };
};

export default async function DashboardOverview() {

    const session = await auth();

  const [{ todayOrders, pendingOrders, totalCustomers, todayRevenue, recentOrders }, chartData] =
    await Promise.all([getDashboardStats(), getChartData()]);

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground">Overview</h1>

      <Greeting firstName={session?.user?.firstName ?? "there"} />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Coffee} label="Orders today" value={todayOrders} />
        <StatCard icon={Clock} label="Pending" value={pendingOrders} />
        <StatCard icon={Wallet} label="Revenue today" value={`KSh ${todayRevenue}`} />
        <StatCard icon={Users} label="Customers" value={totalCustomers} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart data={chartData.revenueByDay} />
        <StatusChart data={chartData.ordersByStatus} />
        <TopItemsChart data={chartData.topItems} />
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-lg text-card-foreground">Recent orders</h2>
          <Link href="/private/dashboard/orders" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            No orders yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {(recentOrders as RecentOrder[]).map((order) => (
              <li key={order._id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm text-card-foreground">{order.contact.fullName}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-card-foreground">KSh {order.total}</p>
                  <p className="text-xs capitalize text-muted-foreground">{order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}