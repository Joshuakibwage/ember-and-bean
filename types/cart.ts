
import type { MenuItem } from "@/types/menu-item";

export type CartItem = {
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    servedAs?: "hot" | "iced";
};

export type CartInput = Pick<MenuItem, "slug" | "name" | "price" | "imageUrl"> & {
    quantity: number;
    servedAs?: "hot" | "iced";
};