import connectDB from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import Link from "next/link";
import Image from "next/image";

const RelatedItems = async ({ category, excludeSlug }: { category: string; excludeSlug: string }) => {
    
    await connectDB();
    
    const items = await MenuItem.find({
        category,
        slug: { $ne: excludeSlug },
        available: true,
    })
        .limit(3)
        .lean();

    if (items.length === 0) return null;

    return (
        <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-heading text-2xl text-foreground">You might also like</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {items.map((related) => (
                    <Link
                        key={related._id.toString()}
                        href={`/menu/${related.slug}`}
                        className="group rounded-2xl border border-border bg-card"
                    >
                        <div className="relative aspect-4/5 overflow-hidden rounded-t-2xl">
                            <Image
                                src={related.imageUrl}
                                alt={related.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="font-heading text-base text-card-foreground">{related.name}</h3>
                            <p className="mt-1 font-mono text-sm text-muted-foreground">KSh {related.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedItems;