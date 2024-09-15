import { Elysia, t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { exerciseEvents } from '@/db/schema'
import CRUDController from '@/lib/crud-controller'
import { nanoid, withoutId } from '@/lib/utils'

/** Control how the application can interact with the `exerciseEvents` model */
class ExerciseEventsController extends CRUDController<typeof exerciseEvents> {
	constructor() {
		super(exerciseEvents)
	}
}

const insertSchema = createInsertSchema(exerciseEvents)
const selectSchema = createSelectSchema(exerciseEvents)

/** Handle routes for the `exercises` model */
export const exerciseEventsRouter = new Elysia({ prefix: '/exercise-events' })
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
