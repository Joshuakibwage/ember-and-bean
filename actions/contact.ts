"use server";


import connectDB from "@/lib/db";
import contactMessage from "@/models/contactMessage";


export type ContactState = {
    errors?: {
        name?: string;
        email?: string;
        message?: string;
    },
    success?: boolean;
}


export async function sendContactMessage(
    _prevState: ContactState,
    formData: FormData,
):  Promise<ContactState> {

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const errors: ContactState["errors"] = {};

    if(!name || name.trim().length < 2) errors.name = "Enter your name.";

    if(!email || !email.includes("@")) errors.email = "Enter a valid email.";

    if(!message || message.trim().length < 10) errors.message = "Message is a bit short.";

    if(Object.keys(errors).length > 0) {
        return { errors }
    }

    await connectDB();

    await contactMessage.create({ name, email, message });

    return { success: true };

}