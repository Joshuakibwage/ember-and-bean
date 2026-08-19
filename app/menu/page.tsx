
import FilterBar from "@/components/menu/FilterBar";
import MenuGridSkeleton from "@/components/menu/MenuGridSkeleton";
import { Suspense } from "react";
import MenuResults from "@/components/menu/MenuResults";
import ErrorBoundary from "@/components/ErrorBoundary";


type SearchParams = Promise<{
  category?: string;
  sort?: string;
  diet?: string;
}>;


export default async function MenuPage(
    {  searchParams } : {  searchParams: SearchParams;  }
) {

    const { category, sort, diet } = await searchParams;
 
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

            <ErrorBoundary
                title="We couldn't load the menu"
                message="This is usually temporary. Try again in a moment!"
            > 
                <Suspense
                    key={`${category}-${sort}-${diet}`}
                    fallback={<MenuGridSkeleton count={6} />}
                >
                    <MenuResults
                        category={category}
                        sort={sort}
                        diet={diet}
                    />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};