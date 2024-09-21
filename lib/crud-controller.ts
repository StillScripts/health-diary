import { db } from '@/db/connection'
import { type InferInsertModel, InferSelectModel, eq } from 'drizzle-orm'
import { PgTable } from 'drizzle-orm/pg-core'

class CRUDController<
	T extends PgTable & {
		id: any
	}
> {
	db: typeof db
	model: T

	constructor(model: T) {
		this.db = db
		this.model = model
	}

	async index(): Promise<Array<InferSelectModel<T>>> {
		return await this.db.select().from(this.model)
	}

	async show(id: string | number): Promise<InferSelectModel<T>> {
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
		data: Partial<Omit<InferInsertModel<T>, 'id'>>
	) {
		const [result] = await this.db
			.update(this.model)
			.set(data as any)
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
