import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'
import { getExercise } from '@/app/(server)/actions/exercises'
import { getServerUser } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

const EditExercise = async ({ params }: { params: { id: string } }) => {
  const session = await getServerUser()
  if (!session?.data?.user?.id || !params.id) {
    redirect('/exercises')
  }

  const exercise = await getExercise({ id: params.id })

  if (!exercise?.id) {
    notFound()
  }

  return <ExerciseForm exercise={exercise} />
}

export default EditExercise
