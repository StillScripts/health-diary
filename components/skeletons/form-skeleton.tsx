import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const FormSkeleton = () => (
	<Card className="mx-auto w-full max-w-md sm:min-w-96">
		<CardHeader>
			<CardTitle>
				<Skeleton className="mb-2 h-5 w-16"></Skeleton>
			</CardTitle>
			<CardDescription>
				<Skeleton className="h-3 w-full"></Skeleton>
			</CardDescription>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<Skeleton className="h-3 w-12"></Skeleton>
				<Skeleton className="mt-2 h-6 w-full rounded-sm"></Skeleton>
			</div>
			<div>
				<Skeleton className="h-3 w-12"></Skeleton>
				<Skeleton className="mt-2 h-6 w-full rounded-sm"></Skeleton>
			</div>
			<div>
				<Skeleton className="h-3 w-12"></Skeleton>
				<Skeleton className="mt-2 h-6 w-full rounded-sm"></Skeleton>
			</div>
		</CardContent>

		<CardFooter className="flex justify-end">
			<Skeleton className="h-7 w-16" />
		</CardFooter>
	</Card>
)
