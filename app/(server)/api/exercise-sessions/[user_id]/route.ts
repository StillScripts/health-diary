import { db } from '@/db/connection'
import { exerciseEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET({ params }: { params: { user_id: string } }) {
  const userId = params?.user_id

  const data = await db.query.exerciseEvents.findMany({
    where: eq(exerciseEvents.userId, userId)
  })

  return Response.json({ data })
}
