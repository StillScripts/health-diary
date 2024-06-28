'use server'
import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { getServerUser } from '@/lib/supabase/server'
import { ActionStatus } from '@/lib/utils'
import { eq } from 'drizzle-orm'
import { zfd } from 'zod-form-data'

const userValidator = zfd.formData({
  firstName: zfd.text(),
  lastName: zfd.text()
})

export const updateUser = async (state: ActionStatus, formData: FormData) => {
  try {
    const { firstName, lastName } = userValidator.parse(formData)
    const session = await getServerUser()
    if (!session?.data?.user?.id) {
      throw new Error('Unauthorised')
    }

    await db
      .update(users)
      .set({ firstName, lastName })
      .where(eq(users.id, session.data.user.id))
    return {
      success: true
    }
  } catch (error) {
    return {
      error: true
    }
  }
}
