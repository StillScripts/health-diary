'use server'

import { db } from '@/db/connection'
import { exerciseEvents, exerciseSets } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { ActionStatus } from '@/lib/utils'
import type { ExerciseEventSchema } from '@/lib/validators/exercise-event-validator'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
  const session = await getServerUser()
  const userId = session?.data?.user?.id
  if (!userId) {
    return [] //throw new Error('Unauthorised')
  }
  return await db.query.exerciseEvents.findMany({
    where: eq(exerciseEvents.userId, userId)
  })
}

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

  const pathId = response[0]?.updatedId
  if (pathId) {
    revalidatePath(`/exercise-sessions/${pathId}/edit`, 'page')
    redirect(`/exercise-sessions/${pathId}/edit?tab=activities`)
  }
}

export const deleteExerciseEvent = async (
  state: ActionStatus,
  formData: FormData
) => {
  try {
    const session = await getServerUser()
    const userId = session?.data?.user?.id
    if (!userId) {
      throw new Error('Unauthorised')
    }

    const exerciseEventId = formData.get('id') as string

    if (!exerciseEventId) {
      throw new Error('Missing exercise id')
    }

    await db
      .delete(exerciseSets)
      .where(eq(exerciseSets.exerciseEventId, exerciseEventId))
    await db
      .delete(exerciseEvents)
      .where(eq(exerciseEvents.id, exerciseEventId))
    revalidatePath('/exercise-sessions', 'page')

    return {
      success: true
    }
  } catch (error) {
    return {
      // @ts-expect-error
      error: error.message
    }
  }
}
