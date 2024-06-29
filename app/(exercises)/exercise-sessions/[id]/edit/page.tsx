import ExerciseSessionForm from '@/app/(exercises)/_components/exercise-session-form'
import { ExerciseMainContainer } from '@/app/(exercises)/_components/layout/exercise-main-container'
import { ExercisePageHeader } from '@/app/(exercises)/_components/layout/exercise-page-header'
import { getExerciseEvent } from '@/app/(server)/actions/exercise-events'
import { getExercises } from '@/app/(server)/actions/exercises'
import { getServerUser } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

//export const revalidate = 0

const EditExerciseEvent = async ({ params }: { params: { id: string } }) => {
  const session = await getServerUser()
  if (!session?.data?.user?.id || !params.id) {
    redirect('/exercise-sessions')
  }

  const exerciseEvent = await getExerciseEvent({ id: params.id })
  const exercises = await getExercises()

  if (!exerciseEvent?.id) {
    notFound()
  }

  return (
    <ExerciseSessionForm exerciseEvent={exerciseEvent} exercises={exercises} />
  )
}

export default EditExerciseEvent
