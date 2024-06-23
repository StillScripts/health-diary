import { z } from 'zod'

export const exerciseSetSchema = z.object({
  sets: z.array(
    z.object({
      id: z.string(),
      exercise_id: z.string(),
      reps: z.coerce.number().optional(),
      weight: z.string().optional(),
      distance: z.string().optional()
    })
  )
})

export type ExerciseSetSchema = z.infer<typeof exerciseSetSchema>
