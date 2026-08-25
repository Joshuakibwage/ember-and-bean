export type OrderDetail = {
    _id: string;
    createdAt: string;
    status: string;
    total: number;
    contact: { fullName: string; phone: string; email: string };
    fulfillment: {
        method: "pickup" | "delivery";
        address?: { line1: string; city: string; notes?: string };
    };
    items: { name: string; price: number; quantity: number; servedAs?: string }[];
};