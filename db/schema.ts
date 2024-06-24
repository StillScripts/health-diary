import { nanoid } from '@/lib/utils'
import { relations, sql } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'

const createdAndUpdated = {
  createdAt: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`now()`)
    .notNull()
}

/**
 * TABLES
 */

/** Table for storing extra data on users. The id matches the auth id */
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  firstName: varchar('first_name'),
  lastName: varchar('last_name')
})

/** Table for storing a single exercise event, like swimming 50 laps of 25m pool  */
export const exerciseEvents = pgTable('exercise_events', {
  id: varchar('id', { length: 13 }) // ee_1234567899
    .notNull()
    .primaryKey()
    .$defaultFn(() => `ee_${nanoid(10)}`),
  startTime: timestamp('start_time')
    .default(sql`now()`)
    .notNull(),
  endTime: timestamp('end_time'),
  notes: text('notes'),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id)
})

export const activityTypeEnum = pgEnum('activity_type', [
  'Body Weight',
  'Weights',
  'Distance',
  'Sport'
])

/** Table for storing a single exercise type, like swimming */
export const exercises = pgTable('exercises', {
  id: varchar('id', { length: 13 }) // ex_1234567899
    .notNull()
    .primaryKey()
    .$defaultFn(() => `ex_${nanoid(10)}`),
  title: varchar('title'),
  description: text('description'),
  activityType: activityTypeEnum('activity_type')
})

/** Table for storing each set in an exercise session */
export const exerciseSets = pgTable('exercise_sets', {
  id: varchar('id', { length: 13 }) // es_1234567899
    .notNull()
    .primaryKey()
    .$defaultFn(() => `es_${nanoid(10)}`),
  reps: integer('reps'),
  weight: varchar('weight'),
  distance: varchar('distance'),
  // By default it will be an event unless an exercise session is created
  exerciseEventId: varchar('exercise_event_id', { length: 13 }).references(
    () => exerciseEvents.id
  ),
  exerciseId: varchar('exercise_id', { length: 13 }).references(
    () => exercises.id
  ),
  ...createdAndUpdated
})

/**
 * RELATIONS
 */

/** An exercise session will be tied to one user and one exercise set */
export const exerciseEventsRelations = relations(
  exerciseEvents,
  ({ many, one }) => ({
    exerciseSets: many(exerciseSets),
    user: one(users, {
      fields: [exerciseEvents.userId],
      references: [users.id]
    })
  })
)

/** An exercise session will be abstract and have many exercise sets */
export const exercisesRelations = relations(exercises, ({ many }) => ({
  exerciseSets: many(exerciseSets)
}))

/** An exercise set will always be linked to one exercise */
export const exerciseSetsRelations = relations(exerciseSets, ({ one }) => ({
  exerciseEvent: one(exerciseEvents, {
    fields: [exerciseSets.exerciseEventId],
    references: [exerciseEvents.id]
  }),
  exercises: one(exercises, {
    fields: [exerciseSets.exerciseId],
    references: [exercises.id]
  })
}))

/** User can have many exercise events */
export const usersRelations = relations(users, ({ many }) => ({
  exerciseEvents: many(exerciseEvents)
}))
