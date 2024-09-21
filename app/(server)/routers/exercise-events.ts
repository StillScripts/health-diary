// This can serve as a demo for a full Elysia controller for a Drizzle model
import { Elysia, t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { exerciseEvents } from '@/db/schema'
import CRUDController from '@/lib/crud-controller'
import { nanoid, withoutId } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'

const prefix = '/exercise-events'

/** Control how the application can interact with the `exerciseEvents` model */
class ExerciseEventsController extends CRUDController<typeof exerciseEvents> {
	constructor() {
		super(exerciseEvents)
	}

	async featured() {
		return await this.db.select().from(this.model).limit(3)
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
			body: withoutId(insertSchema),
			afterHandle() {
				revalidatePath(prefix)
			}
		}
	)
	.patch(
		'/:id',
		async ({ ExerciseEventsController, params: { id }, body }) => {
			await ExerciseEventsController.update(id, body)
		},
		{
			body: t.Partial(withoutId(insertSchema)),
			afterHandle() {
				revalidatePath(prefix)
			}
		}
	)
	.delete(
		'/:id',
		async ({ ExerciseEventsController, params: { id } }) => {
			await ExerciseEventsController.delete(id)
		},
		{
			afterHandle() {
				revalidatePath(prefix)
			}
		}
	)
	// example route that goes beyond the core CRUD routes
	.get(
		'/featured',
		async ({ ExerciseEventsController }) =>
			await ExerciseEventsController.featured(),
		{
			response: t.Array(selectSchema)
		}
	)
