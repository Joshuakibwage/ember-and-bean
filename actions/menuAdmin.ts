"use server";

import connectDB from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import { revalidatePath } from "next/cache";

export type MenuItemFormState = {
    errors?: Record<string, string>;
    success?: boolean;
};

function parseForm(formData: FormData) {

    return {

        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        compareAtPrice: formData.get("compareAtPrice")
            ? Number(formData.get("compareAtPrice"))
            : undefined,
        category: formData.get("category") as string,
        imageUrl: formData.get("imageUrl") as string,
        servedAs: formData.getAll("servedAs") as string[],
        dietaryTags: formData.getAll("dietaryTags") as string[],
        allergens: formData.getAll("allergens") as string[],
        ingredients: (formData.get("ingredients") as string)
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean),
        available: formData.get("available") === "on",

    };

}

function validate(data: ReturnType<typeof parseForm>) {

    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) errors.name = "Name is required.";
    if (!data.slug || data.slug.trim().length < 2) errors.slug = "Slug is required.";
    if (!data.description) errors.description = "Description is required.";
    if (!data.price || data.price <= 0) errors.price = "Enter a valid price.";
    if (!data.category) errors.category = "Choose a category.";
    if (!data.imageUrl) errors.imageUrl = "Image URL is required.";

    if (data.compareAtPrice && data.compareAtPrice <= data.price) {
        errors.compareAtPrice = "Must be greater than price.";
    }

    return errors;
}



export async function createMenuItem(

    _prev: MenuItemFormState,
    formData: FormData

): Promise<MenuItemFormState> {

    const data = parseForm(formData);
    const errors = validate(data);
    if (Object.keys(errors).length > 0) return { errors };

    await connectDB();
    await MenuItem.create(data);
    revalidatePath("/private/dashboard/menu");

    return { success: true };
}



export async function updateMenuItem(

    id: string,
    _prev: MenuItemFormState,
    formData: FormData

): Promise<MenuItemFormState> {

    const data = parseForm(formData);
    const errors = validate(data);
    if (Object.keys(errors).length > 0) return { errors };

    await connectDB();
    await MenuItem.findByIdAndUpdate(id, data);
    revalidatePath("/private/dashboard/menu");

    return { success: true };
}

export async function deleteMenuItem(id: string) {

    await connectDB();
    await MenuItem.findByIdAndDelete(id);

    revalidatePath("/private/dashboard/menu");
};