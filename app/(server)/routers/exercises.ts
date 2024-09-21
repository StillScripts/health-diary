// This can serve as a demo for a full Elysia controller for a Drizzle model
import { Elysia, t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { exercises } from '@/db/schema'
import CRUDController from '@/lib/crud-controller'
import { nanoid, withoutId } from '@/lib/utils'

const prefix = '/exercises'

/** Control how the application can interact with the `exercises` model */
class ExercisesController extends CRUDController<typeof exercises> {
	constructor() {
		super(exercises, prefix)
	}

	async featured() {
		return await this.db.select().from(this.model).limit(3)
	}
}

/** Validate input for the `exercises` model */
const insertSchema = createInsertSchema(exercises)
/** Validate output for the `exercises` model */
const selectSchema = createSelectSchema(exercises)

/** Handle routes for the `exercises` model */
export const exercisesRouter = new Elysia({ prefix })
	.decorate({
		ExercisesController: new ExercisesController()
	})
	// index
	.get(
		'/',
		async ({ ExercisesController }) => await ExercisesController.index(),
		{
			response: t.Array(selectSchema)
		}
	)
	// show
	.get(
		'/:id',
		async ({ ExercisesController, params: { id } }) =>
			await ExercisesController.show(id),
		{
			response: selectSchema
		}
	)
	// create
	.post(
		'/',
		async ({ ExercisesController, body }) => {
			await ExercisesController.create({ id: `ex_${nanoid(10)}`, ...body })
		},
		{
			body: withoutId(insertSchema)
		}
	)
	// update
	.patch(
		'/:id',
		async ({ ExercisesController, params: { id }, body }) => {
			await ExercisesController.update(id, body)
		},
		{
			body: t.Partial(withoutId(insertSchema))
		}
	)
	// delete
	.delete('/:id', async ({ ExercisesController, params: { id } }) => {
		await ExercisesController.delete(id)
	})
	// example route that goes beyond the core CRUD routes
	.get(
		'/featured',
		async ({ ExercisesController }) => await ExercisesController.featured(),
		{
			response: t.Array(selectSchema)
		}
	)
