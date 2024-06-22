import { getExerciseEvents } from '@/app/(server)/actions/exercise-events'
import { AddExerciseEventButton } from '../_components/buttons/add-exercise-event'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default async function ExercissionSessions() {
  const events = await getExerciseEvents()
  return (
    <div>
      <h1>Exercise Sessions</h1>
      <AddExerciseEventButton />
      <div className="mt-8">
        <Table>
          <TableCaption>A list of all exercise events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  {event.startTime && new Date(event.startTime).toTimeString()}
                </TableCell>
                <TableCell>
                  {event.endTime && new Date(event.endTime).toTimeString()}
                </TableCell>
                <TableCell>{event.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
