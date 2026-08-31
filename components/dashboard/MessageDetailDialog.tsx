'use client';

import { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { markMessageRead } from "@/actions/inbox";
import type { InboxMessage } from "@/types/ibox";

const MessageDetailDialog = ({
    message,
    open,
    onOpenChange,
}: {
    message: InboxMessage | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    useEffect(() => {
            if (message && message.status === "new") {
            markMessageRead(message.id);
            }
        // only fire when a *new* message is opened — not on every re-render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message?.id]);

    if (!message) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{message.name}</DialogTitle>
                    <DialogDescription>
                        {message.email} · {new Date(message.createdAt).toLocaleString()}
                    </DialogDescription>
                </DialogHeader>

                <p className="whitespace-pre-wrap text-sm leading-relaxed text-card-foreground">
                {message.message}
                </p>

                <div className="mt-5 flex justify-end">
                    <Button
                        variant="outline"
                        className="rounded-full"
                        nativeButton={false}
                        render={<a href={`mailto:${message.email}`}>Reply by email</a>}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MessageDetailDialog;