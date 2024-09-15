// app/api/[[...slugs]]/route.ts
import { Elysia, t } from 'elysia'

import { exercises } from '@/db/schema'
import CRUDController from '@/lib/crud-service'
import { desc } from 'drizzle-orm'

type ThisModel = typeof exercises
class ExercisesService extends CRUDController<ThisModel> {
	constructor(model: ThisModel) {
		super(model)
	}

	async recentThree() {
		return await this.db.select().from(this.model).limit(3)
	}
}

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
		// @ts-expect-error (we will use the schema from Drizzle later)
		async ({ ExercisesService, body }) => await ExercisesService.create(body)
	)
	// update
	.patch('/:id', async ({ ExercisesService, params: { id }, body }) => {
		// @ts-expect-error (we will use the schema from Drizzle later)
		await ExercisesService.update(id, body)
	})
	// delete
	.delete('/:id', async ({ ExercisesService, params: { id } }) => {
		await ExercisesService.delete(id)
	})
	// NOTE new & edit are Rails methods for UI, we can manage these on the frontend
	// Other routes
	.get(
		'/recent-three',
		async ({ ExercisesService }) => await ExercisesService.recentThree()
	)
