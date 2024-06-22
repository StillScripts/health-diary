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
    .nullish(),
  notes: z.string().nullish()
})
