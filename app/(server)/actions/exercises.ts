'use server'

import { db } from '@/db/connection'
import { exercises } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { eq } from 'drizzle-orm'
import { nanoid, type ActionStatus } from '@/lib/utils'

export const getExercise = async ({ id }: { id: string }) => {
	return await db.query.exercises.findFirst({
		where: eq(exercises.id, id)
	})
}

export type Exercise = Awaited<ReturnType<typeof getExercise>>

export const getExercises = async () => {
	const session = await getServerUser()
	const userId = session?.data?.user?.id
	if (!userId) {
		return []
	}
	return await db.query.exercises.findMany({
		where: eq(exercises.userId, userId)
	})
}

export const createExercise = async (
	state: ActionStatus,
	formData: FormData
) => {
	try {
		const id = `ex_${nanoid(10)}`

		const session = await getServerUser()
		const userId = session?.data?.user?.id
		if (!userId) {
			throw new Error('Unauthorised')
		}

		const newEvent = await db
			.insert(exercises)
			.values({
				id,
				userId
			})
			.returning()
		if (!newEvent[0]?.id) {
			throw new Error('An error occurred')
		}
		return {
			id: newEvent[0]?.id,
			success: true
		}
	} catch (error) {
		return {
			// @ts-expect-error
			error: error.message
		}
	}
}
