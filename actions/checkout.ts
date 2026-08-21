"use server";

import connectDB from "@/lib/db";
import Order from "@/models/order";
import { auth } from "@/auth";
import { randomUUID } from "crypto";


type CheckoutInput = {
    items: { slug: string; name: string; price: number; quantity: number; servedAs?: string }[];
    fulfillment: {
        method: "pickup" | "delivery";
        address?: { line1: string; city: string; notes?: string };
    };
    contact: { fullName: string; phone: string; email: string };
};

const DELIVERY_FEE = 150;


export async function startCheckout(input: CheckoutInput) {

    const session = await auth();

    if(!session?.user) {
        throw new Error("You must be logged in to checkout!")
    }

    if(input.fulfillment.method === "delivery" && !input.fulfillment.address?.line1) {
        throw new Error("A delivery address is required!")
    }

    await connectDB();

    const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity , 0);
    const deliveryFee = input.fulfillment.method === "delivery" ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;
    const reference = `EB-${randomUUID()}`;


    const order = await Order.create({
        user: session.user.id,
        items: input.items,
        fulfillment: input.fulfillment,
        contact: input.contact,
        subtotal,
        deliveryFee,
        total,
        payment: { provider: "paystack", reference, status: "pending" }
    });

    console.log("Paystack key present:", !!process.env.PAYSTACK_SECRET_KEY);
console.log("Paystack key prefix:", process.env.PAYSTACK_SECRET_KEY?.slice(0, 7));


    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: input.contact.email,
            amount: Math.round(total * 100),
            reference,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify`,
            metadata: { orderId: order._id.toString() },
        }), 
    })

    const data = await paystackRes.json();

    if(!data.status) {
        order.payment.status = "failed";
        await order.save();
        throw new Error(data.message ?? "Could not start payment.");
    }

    return { authorizationUrl: data.data.authorization_url };

}

