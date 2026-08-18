import connectDB from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import FilterBar from "@/components/menu/FilterBar";



type SearchParams = Promise<{
  category?: string;
  sort?: string;
  diet?: string;
}>;


export default async function MenuPage(
    { 
        searchParams 
    } : {
        searchParams: Promise<{
            category?: string; 
            sort?: string; 
            diet?: string}
        >;
    }
) {

    const { category, sort, diet } = await searchParams;

    await connectDB();

    const query: Record<string, unknown> = { available: true };

    if(category && category !== "all") query.category = category;
    if(diet) query.dietaryTags = diet;

    const sortMap: Record<string, Record<string, 1 | -1>> = {
        "price-asc": {price: 1},
        "price-desc": { price: -1 },
        name: { name: 1 },
        newest: { createdAt: -1 },
    };

    const items = await MenuItem.find(query).sort(sortMap[sort ?? "newest"]).lean();

    return (
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="mb-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
                    Full Menu
                </span>

                <h1 className="mt-2 font-heading text-3xl text-foreground sm:text-4xl">
                    Coffee, Pastries &amp; Cake
                </h1>
            </div>

            <FilterBar 
                activeCategory={category ?? "all"}
                activeDiet={diet}
                activeSort={sort ?? "newest"}
            />
        </div>
    );
};