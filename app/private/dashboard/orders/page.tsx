import connectDB from "@/lib/db";
import Order from "@/models/order";
import OrdersTable from "@/components/dashboard/OrdersTable";

export default async function AdminOrdersPage() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return <OrdersTable orders={JSON.parse(JSON.stringify(orders))} />;
}