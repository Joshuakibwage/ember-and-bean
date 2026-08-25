import connectDB from "@/lib/db";
import MenuItemModel from "@/models/MenuItem";
import MenuTable from "@/components/dashboard/MenuTable";

export default async function AdminMenuPage() {
  await connectDB();
  const items = await MenuItemModel.find().sort({ createdAt: -1 }).lean();

  return (
    <MenuTable
      items={JSON.parse(JSON.stringify(items)).map((i: { _id: string }) => ({ ...i, id: i._id }))}
    />
  );
}