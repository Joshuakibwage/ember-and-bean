
const MenuCardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-border bg-card">
    <div className="aspect-4/5 animate-pulse bg-muted motion-reduce:animate-none" />
    <div className="space-y-3 p-5">
      <div className="flex items-baseline gap-2">
        <div className="h-5 w-24 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        <span className="flex-1" />
        <div className="h-4 w-12 animate-pulse rounded bg-muted motion-reduce:animate-none" />
      </div>
      <div className="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-muted motion-reduce:animate-none" />
    </div>
  </div>
);

export default MenuCardSkeleton;