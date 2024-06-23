'use server'

import { db } from '@/db/connection'
import { exerciseEvents, exerciseSets } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import type { ExerciseEventSchema } from '@/lib/validators/exercise-event-validator'
import { ExerciseSetSchema } from '@/lib/validators/exercise-set-validator'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const setTimeOnDate = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  date.setHours(hours, minutes, 0, 0)
  return date
}

export const getExerciseEvent = async ({ id }: { id: string }) => {
  return await db.query.exerciseEvents.findFirst({
    where: eq(exerciseEvents.id, id),
    with: { exerciseSets: true }
  })
}

export type ExerciseEvent = Awaited<ReturnType<typeof getExerciseEvent>>

export const getExerciseEvents = async () => {
  return await db.query.exerciseEvents.findMany()
}

export const upsertExerciseSets = async (
  data: ExerciseSetSchema & { exerciseEventId: string }
) => {
  const sets = data?.sets?.map(set => ({
    ...set,
    exerciseEventId: data.exerciseEventId
  }))
  if (!sets || sets.length === 0) {
    return 'no sets'
  }

  const session = await getServerUser()
  if (!session?.data?.user?.id) {
    throw new Error('Unauthorised')
  }

  const response = await db
    .insert(exerciseSets)
    .values(sets)
    .returning({ updatedId: exerciseEvents.id })

  if (response[0].updatedId) {
    revalidatePath(`/exercise-sessions/${response}/edit`, 'page')
  }
}
