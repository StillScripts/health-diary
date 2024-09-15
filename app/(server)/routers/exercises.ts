import { Elysia, t } from 'elysia'
import { createInsertSchema } from 'drizzle-typebox'

import { exercises } from '@/db/schema'
import CRUDController from '@/lib/crud-controller'
import { nanoid, withoutId } from '@/lib/utils'

/** Control how the application can interact with the `exercises` model */
class ExercisesController extends CRUDController<typeof exercises> {
	constructor() {
		super(exercises)
	}

	async featured() {
		return await this.db.select().from(this.model).limit(3)
	}
}

/** Validate inputs for the `exercises` model */
const insertSchema = createInsertSchema(exercises)

/** Handle routes for the `exercises` model */
export const exercisesRouter = new Elysia({ prefix: '/exercises' })
	.decorate({
		ExercisesController: new ExercisesController()
	})
	// index
	.get(
		'/',
		async ({ ExercisesController }) => await ExercisesController.index()
	)
	// show
	.get(
		'/:id',
		async ({ ExercisesController, params: { id } }) =>
			await ExercisesController.show(id)
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
		async ({ ExercisesController }) => await ExercisesController.featured()
	)