import { getExercises } from '@/app/(server)/actions/exercises'
import { AddExerciseButton } from '../_components/add-exercise'

export default async function Exercises() {
  const exercises = await getExercises()
  return (
    <div>
      <h1>Exercises</h1>
      <AddExerciseButton />
      <div className="mt-8">
        {exercises.map(exercise => (
          <p key={exercise.id}>{exercise.title}</p>
        ))}
      </div>
    </div>
  )
}
