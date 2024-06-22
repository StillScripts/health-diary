import { getExercises } from '@/app/(server)/actions/exercises'
import { AddExerciseButton } from '../_components/add-exercise'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default async function Exercises() {
  const exercises = await getExercises()
  return (
    <div>
      <h1>Exercises</h1>
      <AddExerciseButton />
      <div className="mt-8">
        <Table>
          <TableCaption>A list of all exercise options.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.map(exercise => (
              <TableRow key={exercise.id}>
                <TableCell className="font-medium">{exercise.title}</TableCell>
                <TableCell>{exercise.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
