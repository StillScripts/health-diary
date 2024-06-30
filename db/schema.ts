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

export const membershipRoleEnum = pgEnum('role', [
  'Manager',
  'Staff',
  'Customer'
])

/** Table for storing a membership a user has in a specific org */
export const memberships = pgTable('memberships', {
  id: varchar('id', { length: 13 }) // me_1234567899
    .notNull()
    .primaryKey()
    .$defaultFn(() => `me_${nanoid(10)}`),
  role: membershipRoleEnum('role'),
  userId: uuid('user_id').references(() => users.id),
  organisationId: varchar('organisation_id', { length: 14 }).references(
    () => organisations.id
  )
})

/** Table for storing a specific organisation */
export const organisations = pgTable('organisations', {
  id: varchar('id', { length: 14 }) // org_1234567899
    .notNull()
    .primaryKey()
    .$defaultFn(() => `org_${nanoid(10)}`),
  name: varchar('name'),
  ...createdAndUpdated
})

/** Table for storing a single exercise event, like swimming 50 laps of 25m pool  */
export const exerciseEvents = pgTable('exercise_events', {
  id: varchar('id', { length: 13 }) // ee_1234567899
    .notNull()
    .primaryKey()
    .$defaultFn(() => `ee_${nanoid(10)}`),
  startTime: varchar('start_time', { length: 5 }), // 09:30 -> 9:30 AM
  endTime: varchar('end_time', { length: 5 }),
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
  activityType: activityTypeEnum('activity_type'),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id)
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
  exerciseEvents: many(exerciseEvents),
  exercises: many(exercises),
  memberships: many(memberships)
}))

/** Organisations can have many memberships */
export const organisationsRelations = relations(organisations, ({ many }) => ({
  memberships: many(memberships)
}))

/** An memberships link users with organisations */
export const membershipsRelations = relations(memberships, ({ one }) => ({
  users: one(users, {
    fields: [memberships.userId],
    references: [users.id]
  }),
  organisations: one(organisations, {
    fields: [memberships.organisationId],
    references: [organisations.id]
  })
}))
