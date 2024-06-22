import { z } from 'zod'

export const exerciseSetSchema = z.object({
  sets: z.array(
    z.object({
      exercise_id: z.string(),
      reps: z.number().optional(),
      weight: z.string().optional(),
      distance: z.string().optional()
    })
  )
})

export type ExerciseSetSchema = z.infer<typeof exerciseSetSchema>
