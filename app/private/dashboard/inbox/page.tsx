import connectDB from "@/lib/db";
import ContactMessage from "@/models/contactMessage";
import InboxTable from "@/components/dashboard/InboxTable";

export default async function AdminInboxPage() {
  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();

  return (
    <InboxTable
      messages={JSON.parse(JSON.stringify(messages)).map((m: { _id: string }) => ({
        ...m,
        id: m._id,
      }))}
    />
  );
}