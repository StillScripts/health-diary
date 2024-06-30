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
import { format } from 'date-fns'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DeleteExerciseEventButton } from '@/app/(exercises)/_components/buttons/delete-exercise-event'
import { redirect } from 'next/navigation'

export default async function ExercissionSessions() {
  // const session = await getServerUser()

  // if (session?.data?.user) {
  //   redirect('/login')
  // }
  const events = await getExerciseEvents()
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
            {events.map(event => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  {event.startTime && formatDate(new Date(event.startTime))}
                </TableCell>
                <TableCell className="font-medium">
                  {event.startTime &&
                    format(new Date(event.startTime), 'h:mma')}
                </TableCell>
                <TableCell>
                  {event.endTime && format(new Date(event.endTime), 'h:mma')}
                </TableCell>
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
