import { Elysia, t } from 'elysia'
import { createInsertSchema } from 'drizzle-typebox'

import { exercises } from '@/db/schema'
import CRUDController from '@/lib/crud-service'
import { withoutId } from '@/lib/utils'

type ExercisesModel = typeof exercises

class ExercisesService extends CRUDController<ExercisesModel> {
	constructor(model: ExercisesModel) {
		super(model)
	}

	async featured() {
		return await this.db.select().from(this.model).limit(3)
	}
}

const insertSchema = createInsertSchema(exercises)

export const exercisesController = new Elysia({ prefix: '/exercises' })
	.decorate({
		ExercisesService: new ExercisesService(exercises)
	})
	// index
	.get('/', async ({ ExercisesService }) => await ExercisesService.index())
	// show
	.get(
		'/:id',
		async ({ ExercisesService, params: { id } }) =>
			await ExercisesService.show(id)
	)
	// create
	.post(
		'/',
		async ({ ExercisesService, body }) => {
			await ExercisesService.create(body)
		},
		{
			body: insertSchema
		}
	)
	// update
	.patch(
		'/:id',
		async ({ ExercisesService, params: { id }, body }) => {
			await ExercisesService.update(id, body)
		},
		{
			body: t.Partial(withoutId(insertSchema))
		}
	)
	// .patch(
	// 	'/:id',
	// 	async ({ params, body }) => {
	// 		const [todo] = await db
	// 			.update(todos)
	// 			.set(body)
	// 			.where(eq(todos.id, params.id))
	// 			.returning()
	// 		return todo
	// 	},
	// 	{
	// 		body: t.Partial(withoutId(TodoInsertSchema))
	// 	}
	// )
	// delete
	.delete('/:id', async ({ ExercisesService, params: { id } }) => {
		await ExercisesService.delete(id)
	})
	// NOTE new & edit are Rails methods for UI, we can manage these on the frontend
	// Other routes example
	.get(
		'/featured',
		async ({ ExercisesService }) => await ExercisesService.featured()
	)
