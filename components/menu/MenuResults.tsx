
import connectDB from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import MenuGrid from "@/components/menu/MenuGrid";

const sortMap: Record<string, Record<string, 1 | -1>> = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    name: { name: 1 },
    newest: { createdAt: -1 },
};

    type MenuResultsProps = { category?: string; sort?: string; diet?: string };

const MenuResults = async (
    { 
        category, sort, diet 
    }: MenuResultsProps) => {
    await connectDB();

    const query: Record<string, unknown> = { available: true };
    if (category && category !== "all") query.category = category;
    if (diet) query.dietaryTags = diet;

    const items = await MenuItem.find(query).sort(sortMap[sort ?? "newest"]).lean();

    return <MenuGrid items={JSON.parse(JSON.stringify(items))} />;
};

export default MenuResults;