"use server";

import connectDB from "@/lib/db";
import ContactMessage from "@/models/contactMessage";
import { revalidatePath } from "next/cache";

export async function markMessageRead(id: string) {
  await connectDB();
  await ContactMessage.findByIdAndUpdate(id, { status: "read" });
  revalidatePath("/private/dashboard/inbox");
}

export async function deleteMessage(id: string) {
  await connectDB();
  await ContactMessage.findByIdAndDelete(id);
  revalidatePath("/private/dashboard/inbox");
}