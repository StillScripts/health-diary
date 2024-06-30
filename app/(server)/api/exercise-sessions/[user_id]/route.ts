import { db } from '@/db/connection'
import { exerciseEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request) {
  const { pathname, searchParams } = new URL(request.url)
  console.log(pathname)
  console.log(searchParams)
  //const userId = params?.user_id

  // const data = await db.query.exerciseEvents.findMany({
  //   where: eq(exerciseEvents.userId, userId)
  // })

  return Response.json({ data: [] })
}
