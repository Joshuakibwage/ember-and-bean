
'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { updateProfile, type UpdateProfileState } from "@/actions/user";

const initialState: UpdateProfileState = {};

const AccountForm = ({
    firstName,
    lastName,
    email,
}: {
    firstName: string;
    lastName: string;
    email: string;
}) => {

    const [state, formAction] = useActionState(updateProfile, initialState);

    return (
        <form action={formAction} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="firstName">First name</Label>
                    <Input 
                        id="firstName" 
                        name="firstName" 
                        defaultValue={firstName} 
                        required 
                    />
                    {state.errors?.firstName && (
                        <p className="text-xs text-destructive">{state.errors.firstName}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input 
                        id="lastName" 
                        name="lastName" 
                        defaultValue={lastName} 
                        required 
                    />
                    {state.errors?.lastName && (
                        <p className="text-xs text-destructive">{state.errors.lastName}</p>
                    )}
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    value={email} 
                    disabled 
                    className="opacity-60" 
                />
                <p className="text-xs text-muted-foreground">Email can&apos;t be changed yet.</p>
            </div>

            <SubmitButton success={state.success} />
        </form>
    );
};

const SubmitButton = ({ success }: { success?: boolean }) => {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="gap-2 rounded-md cursor-pointer">
            {pending ? (
                <Loader2 className="animate-spin" size={16} />
            ) : success ? (
                <>
                    <Check size={16} /> Saved
                </>
            ) : (
                "Save changes"
            )}
        </Button>
    );
};


export default AccountForm;