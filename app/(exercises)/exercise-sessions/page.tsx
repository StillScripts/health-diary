import { getExerciseEvents } from '@/app/(server)/actions/exercise-events'
import { AddExerciseEventButton } from '@/app/(exercises)/_components/buttons/add-exercise-event'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { ExercisePageHeader } from '@/app/(exercises)/_components/layout/exercise-page-header'
import { format, parse } from 'date-fns'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DeleteExerciseEventButton } from '@/app/(exercises)/_components/buttons/delete-exercise-event'
import { app } from '@/app/treaty'

const formatTimeString = (timeString: string | null) => {
	if (!timeString) {
		return null
	}
	// Parse the time string into a Date object (assuming today's date)
	const date = parse(timeString, 'HH:mm', new Date())

	// Format the Date object as "4:00 pm"
	return format(date, 'h:mm a')
}

export default async function ExerciseSessions() {
	const { data, error } = await app.api['exercise-events'].index.get()
	if (error) {
		throw new Error('An error occurred')
	}
	return (
		<>
			<ExercisePageHeader heading="Exercise Sessions">
				<AddExerciseEventButton />
			</ExercisePageHeader>

			<div className="mt-8">
				<Table>
					<TableCaption>A list of all exercise events.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Start Time</TableHead>
							<TableHead>End Time</TableHead>
							<TableHead>Notes</TableHead>
							<TableHead></TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map(event => (
							<TableRow key={event.id}>
								<TableCell className="font-medium">
									{event.date && formatDate(new Date(event.date))}
								</TableCell>
								<TableCell className="font-medium">
									{formatTimeString(event?.startTime)}
								</TableCell>
								<TableCell>{formatTimeString(event?.endTime)}</TableCell>
								<TableCell>{event.notes}</TableCell>
								<TableCell>
									<Button size="sm" asChild variant="outline">
										<Link href={`/exercise-sessions/${event.id}/edit`}>
											Edit
										</Link>
									</Button>
								</TableCell>
								<TableCell>
									<DeleteExerciseEventButton exerciseEvent={event} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
