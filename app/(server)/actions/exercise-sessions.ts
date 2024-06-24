'use server'

import { db } from '@/db/connection'
import { exerciseEvents } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { nanoid, type ActionStatus } from '@/lib/utils'

export const createExerciseEvent = async (
  state: ActionStatus,
  formData: FormData
) => {
  try {
    const id = `ee_${nanoid(10)}`

    const session = await getServerUser()
    if (!session?.data?.user?.id) {
      throw new Error('Unauthorised')
    }

    const newEvent = await db
      .insert(exerciseEvents)
      .values({
        id,
        userId: session.data.user.id,
        startTime: new Date()
      })
      .returning()
    return {
      id: newEvent[0]?.id,
      success: true
    }
  } catch (error) {
    return {
      error: true
    }
  }
}
