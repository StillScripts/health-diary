import { AddExerciseButton } from '../_components/buttons/add-exercise'
import { ExercisePageHeader } from '../_components/layout/exercise-page-header'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'

export default function LoadingExercise() {
  return (
    <>
      <ExercisePageHeader heading="Exercises">
        <AddExerciseButton />
      </ExercisePageHeader>
      <div className="mt-8">
        <StockSkeleton />
      </div>
    </>
  )
}
