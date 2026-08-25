"use client";

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/actions/contact";


const initialState: ContactState = {};

const ContactForm = () => {

    const [ state, formAction ] = useActionState(sendContactMessage, initialState);

    if(state.success) {
        return(
            <div className="flex flex-col  items-start rounded-md border border-border bg-card p-8">
                <CheckCircle2 size={18} className="text-primary"/>
                <h2 className="mt-4 font-heading text-xl text-card-foreground">Message Sent.</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                    We&apos;ll get back to you within a day or two.
                </p>
            </div>
        )
    }
    return (
        <form action={formAction} className="space-y-5">
            <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" type="text" required/>
                {state.errors?.name && <p className="text-xs text-destructive">{state.errors.name}</p>}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" required />
                {state.errors?.email && <p className="text-xs text-destructive">{state.errors.email}</p>}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={5} required />
                {state.errors?.message && <p className="text-xs text-destructive">{state.errors.message}</p>}
            </div>

            <SubmitButton />
        </form>
    )
}


const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} size="lg" className="rounded-md">
             {pending ? <Loader2 className="animate-spin" size={16} /> : "Send Message" }
        </Button>
    )
}


export default ContactForm;
