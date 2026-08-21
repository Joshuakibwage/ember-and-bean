'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { startCheckout } from "@/actions/checkout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

export default function CheckoutPage() {

    const { items, subtotal } = useCart();
    const router = useRouter();
    const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deliveryFee = method === "delivery" ? 150 : 0;
    const total = subtotal + deliveryFee;

    useEffect(() => {
        if (items.length === 0) {
        router.replace("/cart");
        }
    }, [items.length, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            const { authorizationUrl } = await startCheckout({
                items: items.map((i) => ({
                slug: i.slug,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                servedAs: i.servedAs,
                })),
                fulfillment: {
                method,
                address:
                    method === "delivery"
                    ? {
                        line1: formData.get("addressLine1") as string,
                        city: formData.get("city") as string,
                        notes: formData.get("notes") as string,
                        }
                    : undefined,
                },
                contact: {
                fullName: formData.get("fullName") as string,
                phone: formData.get("phone") as string,
                email: formData.get("email") as string,
                },
            });

            window.location.href = authorizationUrl; // hand off to Paystack

        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:px-6">
            <h1 className="font-heading text-3xl text-foreground">Checkout</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                <fieldset>
                    <legend className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        How should we get it to you?
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        {(["pickup", "delivery"] as const).map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setMethod(option)}
                                aria-pressed={method === option}
                                className={`rounded-md border px-4 py-3 text-left transition-colors ${
                                method === option
                                    ? "border-primary bg-accent text-accent-foreground"
                                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <span className="block text-sm font-medium capitalize">{option}</span>
                                <span className="text-xs">
                                    {option === "pickup" ? "Ready in ~15 min" : `KSh 150 delivery fee`}
                                </span>
                            </button>
                        ))}
                    </div>
                </fieldset>

                {method === "delivery" && (
                    <fieldset className="space-y-4">
                        <legend className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                            Delivery address
                        </legend>
                        <div className="space-y-1.5">
                            <Label htmlFor="addressLine1">Address</Label>
                            <Input id="addressLine1" name="addressLine1" required placeholder="Street, building, apartment" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="city">City / area</Label>
                            <Input id="city" name="city" required placeholder="West lands" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="notes">Delivery notes (optional)</Label>
                            <Input id="notes" name="notes" placeholder="Gate code, landmark, etc." />
                        </div>
                    </fieldset>
                )}

                <fieldset className="space-y-4">
                    <legend className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        Contact
                    </legend>
                    <div className="space-y-1.5">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input id="fullName" name="fullName" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                </fieldset>

                <div className="rounded-md border border-border bg-card p-5">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Subtotal</span>
                        <span className="font-mono">KSh {subtotal}</span>
                    </div>
                    {method === "delivery" && (
                        <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                            <span>Delivery</span>
                            <span className="font-mono">KSh {deliveryFee}</span>
                        </div>
                    )}
                    <div className="mt-2 flex justify-between border-t border-border pt-2 font-medium text-card-foreground">
                        <span>Total</span>
                        <span className="font-mono">KSh {total}</span>
                    </div>
                </div>

                {error && (
                    <p role="alert" className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full gap-2 rounded-md">
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : (
                        <>
                        Pay KSh {total} with Paystack
                        <ArrowRight size={16} />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}