import { notFound } from "next/navigation";
import type { Metadata } from "next";
import connectDB from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import Breadcrumb from "@/components/menu/BreadCrumb";
import AddToCartPanel from "@/components/menu/AddToCartPanel";
import RelatedItems from "@/components/menu/RelatedItems";
import Image from "next/image";
import type { MenuItem as MenuItemType } from "@/types/menuItem";

type Params = Promise<{ slug: string }>;

async function getItem(slug: string) {
    await connectDB();
    const item = await MenuItem.findOne({ slug, available: true }).lean();
    return item ? (JSON.parse(JSON.stringify(item)) as MenuItemType) : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const item = await getItem(slug);
    if (!item) return { title: "Item not found - Ember & Bean" };
    return {
        title: `${item.name} - Ember & Bean`,
        description: item.description,
    };
}

export default async function MenuItemPage({ params }: { params: Params }) {
    const { slug } = await params;
    const item = await getItem(slug);

    if (!item) notFound();

    return (
        <div className="container mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Breadcrumb category={item.category} name={item.name} />

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-md border border-border">
                <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    fill 
                    priority 
                    className="object-cover" 
                />
            </div>

            <div>
            <div className="flex flex-wrap gap-2">
                {item.dietaryTags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-md border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <h1 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
                {item.name}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">{item.description}</p>

            <AddToCartPanel item={item} />

            {item.ingredients.length > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                    <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        Ingredients
                    </h2>
                    <p className="mt-2 text-sm text-foreground">
                        {item.ingredients.join(", ")}
                    </p>
                </div>
            )}

            {item.allergens.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        Contains:
                    </span>
                    {item.allergens.map((a) => (
                        <span
                            key={a}
                            className="rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] capitalize text-accent-foreground"
                        >
                            {a}
                        </span>
                    ))}
                </div>
            )}

            {item.calories != null && (
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                    ~{item.calories} kcal
                </p>
            )}
            </div>
        </div>

        <RelatedItems category={item.category} excludeSlug={item.slug} />
        </div>
    );
}