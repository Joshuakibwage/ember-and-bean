// components/checkout/verify-result.tsx
'use client';

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";

type VerifyResultProps = {
    success: boolean;
    message?: string;
    order?: {
        _id: string;
        total: number;
        fulfillment: { method: "pickup" | "delivery" };
        contact: { fullName: string };
    };
};

const VerifyResult = ({ success, message, order }: VerifyResultProps) => {

    const { clearCart } = useCart();
    const hasCleared = useRef(false);

    useEffect(() => {
        if (success && !hasCleared.current) {
            hasCleared.current = true
            clearCart();
        }
        
    }, [success, clearCart]);

    if (success && order) {
        return (
            <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
                <div className="rounded-full bg-accent p-4">
                    <CheckCircle2 
                        size={28} 
                        className="text-accent-foreground" 
                    />
                </div>
                <h1 className="mt-5 font-heading text-2xl text-foreground">
                    Thanks, {order.contact.fullName.split(" ")[0]}.
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                    Your order is confirmed: KSh {order.total},{" "}
                    {order.fulfillment.method === "pickup" ? "ready for pickup shortly." : "on its way to you."}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Order #{order._id.slice(-8).toUpperCase()}
                </p>

                <Button 
                    size="lg" 
                    className="mt-7 rounded-md" 
                    render={
                        <Link href="/menu">Back to menu</Link>
                    } 
                />
            </div>
        );
    }

    return (
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
                <XCircle size={28} className="text-destructive" />
            </div>
            <h1 className="mt-5 font-heading text-2xl text-foreground">Payment didn&apos;t go through.</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
                {message ?? "Something went wrong verifying your payment."}
            </p>

            <Button 
                size="lg" 
                className="mt-7 rounded-md" 
                render={
                    <Link href="/checkout">Try again</Link>
                } 
            />
        </div>
    );
};

export default VerifyResult;