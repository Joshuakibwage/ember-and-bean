'use client';

import { useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    itemName: string;
    onConfirm: () => Promise<void>;
};

const DeleteConfirmDialog = ({ open, onOpenChange, itemName, onConfirm }: Props) => {
    const [isPending, startTransition] = useTransition();

    const handleConfirm = () => {
        startTransition(async () => {
        await onConfirm();
        onOpenChange(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete &ldquo;{itemName}&rdquo;?</DialogTitle>
                    <DialogDescription>
                        This can&apos;t be undone. The item will be permanently removed from the menu.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm} disabled={isPending} className="gap-2">
                        {isPending ? <Loader2 className="animate-spin" size={16} /> : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmDialog;