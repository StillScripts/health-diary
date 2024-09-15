import { db } from '@/db/connection'
import { SQL, eq } from 'drizzle-orm'
import { PgTable, PgTableWithColumns } from 'drizzle-orm/pg-core'

interface TableWithId {
	id: any
}

type TableColumns<T extends PgTable> =
	T extends PgTableWithColumns<any> ? T['_']['columns'] : never

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

	async create(data: Partial<TableColumns<T>>) {
		const [result] = await this.db
			.insert(this.model)
			.values(data as any)
			.returning()
		return result
	}

	async update(id: string | number, data: Partial<TableColumns<T>>) {
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

// class DemoController extends CRUDController {
// 	constructor(db, model) {
// 		super(db, model)
// 	}

// 	async duplicate(id) {
// 		const [original] = await this.show(id)
// 		if (!original) {
// 			throw new Error('Record not found')
// 		}

// 		// Remove the id from the original to create a new record
// 		const { id: _, ...newData } = original
// 		return await this.create(newData)
// 	}

// 	async recentTen() {
// 		return await this.db
// 			.select()
// 			.from(this.model)
// 			.orderBy(desc(this.model.createdAt))
// 			.limit(10)
// 	}
// }
