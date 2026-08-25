'use client';

import { useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import MessageDetailDialog from "./MessageDetailDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { deleteMessage } from "@/actions/inbox";
import type { InboxMessage } from "@/types/inbox";

const InboxTable = ({ messages }: { messages: InboxMessage[] }) => {
  const [selected, setSelected] = useState<InboxMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InboxMessage | null>(null);

  const unreadCount = messages.filter((m) => m.status === "new").length;

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-2xl text-foreground">Inbox</h1>
        {unreadCount > 0 && (
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs text-primary">
            {unreadCount} new
          </span>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {messages.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            No messages yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {messages.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => setSelected(m)}
                  className="flex w-full items-center gap-4 px-5 py-3.5 text-left hover:bg-muted/50"
                >
                  <span className="shrink-0 text-muted-foreground">
                    {m.status === "new" ? (
                      <Mail size={16} className="text-primary" />
                    ) : (
                      <MailOpen size={16} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm ${
                        m.status === "new" ? "font-medium text-card-foreground" : "text-card-foreground"
                      }`}
                    >
                      {m.name}{" "}
                      <span className="font-normal text-muted-foreground">:   {m.message}</span>
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(m);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Delete message from ${m.name}`}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <MessageDetailDialog
        message={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />

      {deleteTarget && (
        <DeleteConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          itemName={`message from ${deleteTarget.name}`}
          onConfirm={() => deleteMessage(deleteTarget.id)}
        />
      )}
    </div>
  );
};

export default InboxTable;