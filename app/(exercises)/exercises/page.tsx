import { getExercises } from '@/app/(server)/actions/exercises'
import { AddExerciseButton } from '../_components/buttons/add-exercise'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ExerciseMainContainer } from '../_components/layout/exercise-main-container'
import { ExercisePageHeader } from '../_components/layout/exercise-page-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Exercises() {
  const exercises = await getExercises()
  return (
    <ExerciseMainContainer>
      <ExercisePageHeader heading="Exercises">
        <AddExerciseButton />
      </ExercisePageHeader>
      <div className="mt-8">
        <Table>
          <TableCaption>A list of all exercise options.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Activity Type</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.map(exercise => (
              <TableRow key={exercise.id}>
                <TableCell className="font-medium">{exercise.title}</TableCell>
                <TableCell>{exercise.description}</TableCell>
                <TableCell>{exercise.activityType}</TableCell>
                <TableCell>
                  <Button size="sm" asChild variant="outline">
                    <Link href={`/exercises/${exercise.id}/edit`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ExerciseMainContainer>
  )
}
