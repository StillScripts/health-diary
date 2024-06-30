'use server'

import { db } from '@/db/connection'
import { exerciseSets } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { ExerciseSetSchema } from '@/lib/validators/exercise-set-validator'
import { sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

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

  // Assuming exerciseSets table has the following fields: id, exerciseEventId, name, gender, income, status
  const response = await db.transaction(async trx => {
    const results = []
    for (const set of sets) {
      const result = await trx
        .insert(exerciseSets)
        .values({ ...set, reps: set?.reps ?? 0 })
        .onConflictDoUpdate({
          target: exerciseSets.id,
          targetWhere: sql`
            exercise_event_id <> ${set.exerciseEventId} OR 
            exercise_id <> ${set.exerciseId} OR 
            reps <> ${set?.reps ?? 0} OR 
            weight <> ${set.weight} OR 
            distance <> ${set.distance}
          `,
          set: {
            exerciseEventId: sql`excluded.exercise_event_id`,
            exerciseId: sql`excluded.exercise_id`,
            reps: sql`excluded.reps`,
            weight: sql`excluded.weight`,
            distance: sql`excluded.distance`
          }
        })
        .returning({ updatedId: exerciseSets.id })

      results.push(result)
    }
    return results
  })

  if (response[0] && response[0][0]?.updatedId) {
    revalidatePath(`/exercise-sessions/${data.exerciseEventId}/edit`, 'page')
  }
}
