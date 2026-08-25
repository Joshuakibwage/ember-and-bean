'use client';

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert } from "lucide-react";
import { updateUserRole } from "@/actions/customerAdmin";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName: string;
  currentRole: string;
};

const PromoteUserDialog = ({ open, onOpenChange, userId, userName, currentRole }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const nextRole = currentRole === "admin" ? "user" : "admin";

  const handleConfirm = () => {
    setError(null);
    startTransition(async () => {
      try {
        await updateUserRole(userId, nextRole);
        onOpenChange(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-primary" />
            <DialogTitle>
              {nextRole === "admin" ? "Grant admin access?" : "Remove admin access?"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {nextRole === "admin"
              ? `${userName} will be able to manage the menu, orders, and other customers.`
              : `${userName} will lose access to the admin dashboard.`}
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isPending} className="gap-2">
            {isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : nextRole === "admin" ? (
              "Grant admin"
            ) : (
              "Remove admin"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoteUserDialog;