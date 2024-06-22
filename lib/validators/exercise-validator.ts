import { z } from 'zod'

export const exerciseSchema = z.object({
  title: z.string({ required_error: 'A title is required.' }),
  description: z.string({ required_error: 'A description is required.' })
})

export type ExerciseSchema = z.infer<typeof exerciseSchema>
