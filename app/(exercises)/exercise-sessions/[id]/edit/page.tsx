import ExerciseSessionForm from '@/app/(exercises)/_components/exercise-session-form'
import { getExerciseEvent } from '@/app/(server)/actions/exercise-events'
import { getServerUser } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

//export const revalidate = 0

const EditExerciseEvent = async ({ params }: { params: { id: string } }) => {
  const session = await getServerUser()
  if (!session?.data?.user?.id || !params.id) {
    redirect('/exercise-sessions')
  }

  const exerciseEvent = await getExerciseEvent({ id: params.id })

  if (!exerciseEvent?.id) {
    notFound()
  }

  return (
    <div className="p-12">
      <ExerciseSessionForm exerciseEvent={exerciseEvent} />
    </div>
  )
}

export default EditExerciseEvent
