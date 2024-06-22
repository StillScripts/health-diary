'use server'

import { db } from '@/db/connection'
import { exerciseEvents } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { exerciseEventSchema } from '@/lib/validators/exercise-event'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

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

export const updateExerciseEvent = async (
  data: z.infer<typeof exerciseEventSchema> & { id: string }
) => {
  const startTime = setTimeOnDate(data.date, data.startTime)
  const endTime = data.endTime ? setTimeOnDate(data.date, data.endTime) : null
  const notes = data.notes || null

  const session = await getServerUser()
  if (!session?.data?.user?.id) {
    throw new Error('Unauthorised')
  }

  const response = await db
    .update(exerciseEvents)
    .set({ startTime, endTime, notes })
    .where(eq(exerciseEvents.id, data.id))
    .returning({ updatedId: exerciseEvents.id })

  if (response[0].updatedId) {
    revalidatePath(`/exercise-sessions/${response}/edit`, 'page')
  }
}
