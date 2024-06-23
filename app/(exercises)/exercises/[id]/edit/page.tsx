import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'
import { ExerciseMainContainer } from '@/app/(exercises)/_components/layout/exercise-main-container'
import { ExercisePageHeader } from '@/app/(exercises)/_components/layout/exercise-page-header'
import { getExercise } from '@/app/(server)/actions/exercises'
import { getServerUser } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

const EditExercise = async ({ params }: { params: { id: string } }) => {
  const session = await getServerUser()
  if (!session?.data?.user?.id || !params.id) {
    redirect('/exercises')
  }

  const exercise = await getExercise({ id: params.id })
  console.log(exercise)

  if (!exercise?.id) {
    notFound()
  }

  return (
    <ExerciseMainContainer>
      <ExercisePageHeader heading="Record Exercise Activity" />
      <ExerciseForm exercise={exercise} />
    </ExerciseMainContainer>
  )
}

export default EditExercise
