import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Contact | Ember & Bean",
    description: "Get in touch with Ember & Bean.",
};

export default function ContactPage() {
    return (
        <div className="mx-auto min-h-screen max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
                Get in touch
            </span>
            <h1 className="mt-4 font-heading text-4xl leading-[1.1] text-foreground sm:text-5xl">
                Questions, catering, or just to say hi.
            </h1>

            <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
                <div className="space-y-6">
                    <div className="flex items-start gap-3">
                        <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Email</p>
                            <a href="mailto:hello@emberandbean.co.ke" className="text-sm text-muted-foreground hover:text-foreground">
                                hello@emberandbean.co.ke
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Phone</p>
                            <a href="tel:+254700000000" className="text-sm text-muted-foreground hover:text-foreground">
                                +254 700 000 000
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Visit</p>
                            <p className="text-sm text-muted-foreground">Argwings Kodhek Road, Kilimani, Nairobi</p>
                        </div>
                    </div>
                </div>

                <ContactForm />
            </div>
        </div>
    );
}