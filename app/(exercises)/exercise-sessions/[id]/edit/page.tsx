import { db } from '@/db/connection'
import { exerciseEvents } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const EditExerciseEvent = async ({ params }: { params: { id: string } }) => {
  const session = await getServerUser()
  if (!session?.data?.user?.id) {
    redirect('/exercise-sessions')
  }

  const currentExerciseSession = await db.query.exerciseEvents.findFirst({
    where: eq(exerciseEvents.id, params.id),
    with: { exerciseSets: true }
  })

  return <div className="p-12">{JSON.stringify(currentExerciseSession)}</div>
}

export default EditExerciseEvent
