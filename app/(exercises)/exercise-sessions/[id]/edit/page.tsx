import ExerciseSessionForm from '@/app/(exercises)/_components/exercise-session-form'
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
    <div className="p-12">
      <ExerciseSessionForm
        exerciseEvent={exerciseEvent}
        exercises={exercises}
      />
    </div>
  )
}

export default EditExerciseEvent
