import { z } from 'zod'

export const exerciseSchema = z.object({
  id: z.string({ required_error: 'An id is required.' }),
  title: z.string({ required_error: 'A title is required.' }),
  description: z.string({ required_error: 'A description is required.' })
})

export type ExerciseSchema = z.infer<typeof exerciseSchema>
