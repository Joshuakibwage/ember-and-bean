
import MenuGridSkeleton from "@/components/menu/MenuGridSkeleton";

const FeaturedMenuSkeleton = () => (
    <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="h-3 w-32 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                    <div className="mt-3 h-9 w-48 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                    <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                </div>
                
                <div className="h-5 w-28 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            </div>
            <div className="mt-10">
                <MenuGridSkeleton 
                    count={4} 
                    columnsClassName="sm:grid-cols-2 lg:grid-cols-4" 
                />
            </div>
        </div>
    </section>
);

export default FeaturedMenuSkeleton;