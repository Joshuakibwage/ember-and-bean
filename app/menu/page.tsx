export async function MenuPage(
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
}