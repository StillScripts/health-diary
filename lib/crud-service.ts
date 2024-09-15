import { db } from '@/db/connection'
import { type InferInsertModel, eq } from 'drizzle-orm'
import { PgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-typebox'

interface TableWithId {
	id: any
}

class CRUDController<T extends PgTable & TableWithId> {
	db: typeof db
	model: T

	constructor(model: T) {
		this.db = db
		this.model = model
	}

	async index() {
		return await this.db.select().from(this.model)
	}

	async show(id: string | number) {
		const result = await this.db
			.select()
			.from(this.model)
			.where(eq(this.model.id, id))
			.limit(1)
		return result[0]
	}

	async create(data: InferInsertModel<T>) {
		const [result] = await this.db.insert(this.model).values(data).returning()
		return result
	}

	async update(
		id: string | number,
		data: Partial<ReturnType<typeof createInsertSchema<T>>>
	) {
		const [result] = await this.db
			.update(this.model)
			.set(data)
			.where(eq(this.model.id, id))
			.returning()
		return result
	}

	async delete(id: string) {
		const [result] = await this.db
			.delete(this.model)
			.where(eq(this.model.id, id))
			.returning()
		return result
	}
}

export default CRUDController
