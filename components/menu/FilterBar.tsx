"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All" },
  { value: "coffee", label: "Coffee" },
  { value: "pastry", label: "Pastries" },
  { value: "cake", label: "Cake" },
];

const diets = [
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "nut-free", label: "Nut-free" },
];

const sorts = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A - Z" },
];

type FilterBarProps = {
  activeCategory: string;
  activeDiet?: string;
  activeSort: string;
};


const FilterBar = ({ activeCategory, activeDiet, activeSort }: FilterBarProps ) => {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const updateParam = ( key: string, value: string | null ) => {

        const params = new URLSearchParams(searchParams.toString());

        if(value === null || value === "all") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        router.push(`${pathName}?${params.toString()}`, {scroll: false});
    }
    
    return (
        <div className="mb-8 fle flex-col gap-4 border-b border-border pb-6">

            <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Categories filter */}
                <div className="flex flex-wrap gap-2">
                    {
                        categories.map((cat) => (
                            <Button 
                                key={cat.value}
                                type="button"
                                onClick={() => updateParam("category", cat.value)}
                                aria-pressed={activeCategory === cat.value}
                                className={
                                    `rounded-md border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
                                        activeCategory === cat.value
                                        ? "border-primary bg-primary text-primary-foreground" 
                                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                                    }`
                                }
                            >
                                {cat.label}
                            </Button>
                        ))
                    }
                </div>

                {/* Sort */}
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    Sort by
                    <select 
                        value={activeSort}
                        onChange={() => updateParam("sort", e.target.value)}
                        className={cn(
                            "rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground ",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                        )}
                    >
                        {
                            sorts.map((s) => {
                                <option 
                                    key={s.value} 
                                    value={s.value}
                                >
                                    {s.label}
                                </option>
                            })
                        }
                    </select>
                </label>

            </div>

            {/* Diet */}
            <div className="flex flex-wrap gap-2">
                {
                    diets.map((d) => {
                        <Button
                            key={d.value}
                            type="button"
                            onClick={() => updateParam("diet", activeDiet === d.value ? null : d.value)}
                            aria={activeDiet === d.value}
                            className={
                                `rounded-md border px-3 py-1 font-mono text-xs uppercase tracking-wide transition-colors ${ activeDiet === d.value 
                                ? "border-primary bg-accent text-accent-foreground"
                                : "border-border bg-background text-muted-foreground hover:text-foreground"}`
                            }
                        >
                            {d.label}
                        </Button>
                    })
                }
            </div>

        </div>
    )
};

export default FilterBar;