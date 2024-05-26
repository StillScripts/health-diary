'use server'

import { db } from '@/db/connection'
import { exerciseEvents } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import type { ActionStatus } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid'

export const createExerciseEvent = async (
  state: ActionStatus,
  formData: FormData
) => {
  try {
    const id = uuidv4()

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
