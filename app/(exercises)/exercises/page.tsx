import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { ExercisePageHeader } from '../_components/layout/exercise-page-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { app } from '@/app/treaty'
import { DeleteForm } from '@/components/delete-form'

export default async function Exercises() {
	const { data, error } = await app.api.exercises.index.get()
	if (error) {
		throw new Error('An error occurred')
	}

	return (
		<>
			<ExercisePageHeader heading="Exercises">
				<Button asChild>
					<Link href="/exercises/new">Add New Exercise</Link>
				</Button>
			</ExercisePageHeader>
			<div className="mt-8">
				<Table>
					<TableCaption>A list of all exercise options.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Title</TableHead>
							<TableHead className="hidden sm:block">Description</TableHead>
							<TableHead>Activity Type</TableHead>
							<TableHead></TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map(exercise => (
							<TableRow key={exercise.id}>
								<TableCell className="font-medium">{exercise.title}</TableCell>
								<TableCell className="hidden sm:block">
									{exercise.description}
								</TableCell>
								<TableCell>{exercise.activityType}</TableCell>
								<TableCell>
									<Button size="sm" asChild variant="outline">
										<Link href={`/exercises/${exercise.id}/edit`}>Edit</Link>
									</Button>
								</TableCell>
								<TableCell>
									<DeleteForm id={exercise.id} apiRouteKey="exercises" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
