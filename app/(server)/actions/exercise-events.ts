'use server'

import { db } from '@/db/connection'
import { exerciseEvents } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/

export const exerciseEventSchema = z.object({
  date: z.date({
    required_error: 'A date is required.'
  }),
  startTime: z
    .string()
    .regex(timePattern, { message: 'Invalid time format, expected HH:MM' }),
  endTime: z
    .string()
    .regex(timePattern, { message: 'Invalid time format, expected HH:MM' })
    .optional(),
  notes: z.string().optional()
})

export type ExerciseEventSchema = z.infer<typeof exerciseEventSchema>

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
  data: ExerciseEventSchema & { id: string }
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
