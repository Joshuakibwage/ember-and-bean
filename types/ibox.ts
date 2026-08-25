export type InboxMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    status: "new" | "read";
    createdAt: string;
};