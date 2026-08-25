const statusStyles: Record<string, string> = {
    pending: "bg-muted text-muted-foreground",
    paid: "bg-accent text-accent-foreground",
    preparing: "bg-accent text-accent-foreground",
    ready: "bg-primary/15 text-primary",
    completed: "bg-primary/15 text-primary",
    cancelled: "bg-destructive/10 text-destructive",
};

const StatusBadge = ({ status }: { status: string }) => (
    <span
        className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
            statusStyles[status] ?? "bg-muted text-muted-foreground"
        }`}
    >
        {status}
    </span>
);

export default StatusBadge;