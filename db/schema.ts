import { relations, sql } from 'drizzle-orm'
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'
import { v4 as uuidv4 } from 'uuid'

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
  fullName: text('full_name')
})

/** Table for storing a single exercise event, like swimming 50 laps of 25m pool  */
export const exerciseEvents = pgTable('exercise_events', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  startTime: timestamp('start_time')
    .default(sql`now()`)
    .notNull(),
  endTime: timestamp('end_time'),
  notes: text('notes'),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id)
})

/** Table for storing a single exercise type, like swimming */
export const exercises = pgTable('exercises', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  title: varchar('title'),
  description: text('description')
})

/** Table for storing each set in an exercise session */
export const exerciseSets = pgTable('exercise_sets', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  reps: integer('reps'),
  // By default it will be an event unless an exercise session is created
  exerciseEventId: uuid('exercise_event_id').references(
    () => exerciseEvents.id
  ),
  exerciseId: uuid('exercise_id').references(() => exercises.id),
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
