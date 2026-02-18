import { Skeleton, PageSkeleton, SkeletonTable } from "@/components/skeleton";

export default function AccountDetailLoading() {
  return (
    <PageSkeleton>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-9 w-36" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
        <div className="mt-4 flex gap-6 border-t border-border pt-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div>
        <Skeleton className="mb-3 h-6 w-44" />
        <SkeletonTable rows={5} />
      </div>
    </PageSkeleton>
  );
}
