import { Skeleton, PageSkeleton } from "@/components/skeleton";

export default function AccountsLoading() {
  return (
    <PageSkeleton>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="mb-1 h-5 w-40" />
            <Skeleton className="h-8 w-28" />
            <div className="mt-3 flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        ))}
      </div>
    </PageSkeleton>
  );
}
