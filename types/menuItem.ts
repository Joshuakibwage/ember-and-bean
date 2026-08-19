
export type MenuItem = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    category: "coffee" | "pastry" | "cake";
    servedAs?: ("hot" | "iced")[];
    dietaryTags: ("vegan" | "gluten-free" | "dairy-free" | "nut-free")[];
    ingredients: string[];
    allergens: ("nuts" | "dairy" | "gluten" | "soy" | "eggs")[];
    calories?: number;
    imageUrl: string;
    available: boolean;
};