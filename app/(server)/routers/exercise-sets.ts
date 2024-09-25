// This can serve as a demo for a full Elysia controller for a Drizzle model
import { Elysia, t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { exerciseSets } from '@/db/schema'
import CRUDController from '@/lib/crud-controller'
import { nanoid, withoutId } from '@/lib/utils'
import { ExerciseSetSchema } from '@/lib/validators/exercise-set-validator'
import { getServerUser } from '@/lib/supabase/server'
import { db } from '@/db/connection'
import { sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const prefix = '/exercise-sets'

/** Control how the application can interact with the `exerciseSets` model */
class ExerciseSetsController extends CRUDController<typeof exerciseSets> {
	constructor() {
		super(exerciseSets, '/exercise-sessions')
	}
	async upsertExerciseSets(
		data: ExerciseSetSchema & { exerciseEventId: string }
	) {
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
			const results: any[] = []
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
			revalidatePath(this.prefix)
			revalidatePath(`${this.prefix}/${data.exerciseEventId}/edit`)
		}
	}
}

const insertSchema = createInsertSchema(exerciseSets)
const selectSchema = createSelectSchema(exerciseSets)

/** Handle routes for the `exerciseSets` model */
export const exerciseSetsRouter = new Elysia({ prefix })
	.decorate({
		ExerciseSetsController: new ExerciseSetsController()
	})
	.get(
		'/',
		async ({ ExerciseSetsController }) => await ExerciseSetsController.index(),
		{
			response: t.Array(selectSchema)
		}
	)
	.get(
		'/:id',
		async ({ ExerciseSetsController, params: { id } }) =>
			await ExerciseSetsController.show(id),
		{
			response: selectSchema
		}
	)
	.post(
		'/',
		async ({ ExerciseSetsController, body }) => {
			await ExerciseSetsController.create({ id: `es_${nanoid(10)}`, ...body })
		},
		{
			body: withoutId(insertSchema)
		}
	)
	.post(
		'/manage-multiple-sets',
		async ({ ExerciseSetsController, body }) => {
			// @ts-expect-error too hard :(
			await ExerciseSetsController.upsertExerciseSets(body)
			await ExerciseSetsController.create({ id: `es_${nanoid(10)}`, ...body })
		},
		{
			body: t.Object({
				sets: t.Array(insertSchema),
				exerciseEventId: t.String()
			})
		}
	)
	.patch(
		'/:id',
		async ({ ExerciseSetsController, params: { id }, body }) => {
			await ExerciseSetsController.update(id, body)
		},
		{
			body: t.Partial(withoutId(insertSchema))
		}
	)
	.delete('/:id', async ({ ExerciseSetsController, params: { id } }) => {
		await ExerciseSetsController.delete(id)
	})
