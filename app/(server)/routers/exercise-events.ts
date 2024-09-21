// This can serve as a demo for a full Elysia controller for a Drizzle model
import { Elysia, t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { exerciseEvents } from '@/db/schema'
import CRUDController from '@/lib/crud-controller'
import { nanoid, withoutId } from '@/lib/utils'
import { eq } from 'drizzle-orm'

const prefix = '/exercise-events'

/** Control how the application can interact with the `exerciseEvents` model */
class ExerciseEventsController extends CRUDController<typeof exerciseEvents> {
	constructor() {
		super(exerciseEvents, '/exercise-sessions')
	}

	async showWithExerciseSets(id: string) {
		return await this.db.query.exerciseEvents.findFirst({
			where: eq(exerciseEvents.id, id),
			with: { exerciseSets: true }
		})
	}
}

const insertSchema = createInsertSchema(exerciseEvents)
const selectSchema = createSelectSchema(exerciseEvents)

/** Handle routes for the `exerciseEvents` model */
export const exerciseEventsRouter = new Elysia({ prefix })
	.decorate({
		ExerciseEventsController: new ExerciseEventsController()
	})
	.get(
		'/',
		async ({ ExerciseEventsController }) =>
			await ExerciseEventsController.index(),
		{
			response: t.Array(selectSchema)
		}
	)
	.get(
		'/:id',
		async ({ ExerciseEventsController, params: { id } }) =>
			await ExerciseEventsController.show(id),
		{
			response: selectSchema
		}
	)
	.get(
		'/with-sets/:id',
		async ({ ExerciseEventsController, params: { id } }) =>
			await ExerciseEventsController.showWithExerciseSets(id)
	)
	.post(
		'/',
		async ({ ExerciseEventsController, body }) => {
			await ExerciseEventsController.create({ id: `ee_${nanoid(10)}`, ...body })
		},
		{
			body: withoutId(insertSchema)
		}
	)
	.patch(
		'/:id',
		async ({ ExerciseEventsController, params: { id }, body }) => {
			await ExerciseEventsController.update(id, body)
		},
		{
			body: t.Partial(withoutId(insertSchema))
		}
	)
	.delete('/:id', async ({ ExerciseEventsController, params: { id } }) => {
		await ExerciseEventsController.delete(id)
	})
