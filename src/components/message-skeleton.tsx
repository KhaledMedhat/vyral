import { Skeleton } from "./ui/skeleton";

interface MessageSkeletonProps {
    count?: number;
    showHeader?: boolean;
}

export function MessageSkeleton({ showHeader = true }: { showHeader?: boolean }) {
    return (
        <div className="flex gap-4 py-1">
            {/* Avatar */}
            <div className="w-12 shrink-0">
                {showHeader ? (
                    <Skeleton className="size-12 rounded-full" />
                ) : (
                    <div className="w-12" />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
                {showHeader && (
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                )}
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-3/4 max-w-sm" />
            </div>
        </div>
    );
}

export function MessageSkeletonList({ count = 5 }: MessageSkeletonProps) {
    return (
        <div className="space-y-4 p-4">
            {Array.from({ length: count }).map((_, index) => (
                <MessageSkeleton
                    key={index}
                    showHeader={index === 0 || Math.random() > 0.5}
                />
            ))}
        </div>
    );
}

export function LoadingMoreSkeleton() {
    return (
        <div className="space-y-3 p-4 border-b border-muted-foreground/10">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <Skeleton className="h-4 w-4 rounded-full animate-spin" />
                <span>Loading older messages...</span>
            </div>
            <MessageSkeleton showHeader={true} />
            <MessageSkeleton showHeader={false} />
            <MessageSkeleton showHeader={true} />
        </div>
    );
}
