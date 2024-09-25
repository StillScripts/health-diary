import { FormSkeleton } from '@/components/skeletons/form-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<>
			<Skeleton className="mb-2 h-9 w-full"></Skeleton>
			<FormSkeleton />
		</>
	)
}
