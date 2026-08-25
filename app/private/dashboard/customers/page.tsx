import connectDB from "@/lib/db";
import User from "@/models/User";
import { getCustomerOrderCounts } from "@/actions/customerAdmin";
import CustomersTable from "@/components/dashboard/CustomersTable";

export default async function AdminCustomersPage() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 }).lean();

  const orderStats = await getCustomerOrderCounts(users.map((u) => u._id.toString()));

  const customers = users.map((u) => {
    const stats = orderStats.get(u._id.toString());
    return {
      id: u._id.toString(),
      firstName: u.firstName ?? "",
      lastName: u.lastName ?? "",
      email: u.email,
      role: u.role,
      orderCount: stats?.count ?? 0,
      totalSpent: stats?.totalSpent ?? 0,
    };
  });

  return <CustomersTable customers={customers} />;
}