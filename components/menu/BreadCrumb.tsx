import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categoryLabels: Record<string, string> = {
    coffee: "Coffee",
    pastry: "Pastries",
    cake: "Cake",
};

const Breadcrumb = ({ category, name }: { category: string; name: string }) => (
    <nav 
        aria-label="Breadcrumb" 
        className="flex items-center gap-1.5 text-sm text-muted-foreground"
    >
        <Link href="/menu" className="hover:text-foreground">Menu</Link>
        <ChevronRight size={14} />

        <Link href={`/menu?category=${category}`} className="hover:text-foreground">
            {categoryLabels[category] ?? category}
        </Link>

        <ChevronRight size={14} />
        <span className="text-foreground" aria-current="page">{name}</span>
    </nav>
);

export default Breadcrumb;