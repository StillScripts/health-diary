import { z } from 'zod'

export const activityTypes = [
  'Body Weight',
  'Weights',
  'Distance',
  'Sport'
] as const

export const exerciseSchema = z.object({
  id: z.string({ required_error: 'An id is required.' }),
  title: z
    .string({ required_error: 'A title is required.' })
    .min(1, 'A title is required.'),
  activityType: z.enum(activityTypes),
  description: z.string({ required_error: 'A description is required.' })
})

export type ExerciseSchema = z.infer<typeof exerciseSchema>
