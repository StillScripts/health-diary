import { getServerUser } from '@/lib/supabase/server'
import { UserMenu } from './user-menu'
import { Button } from './ui/button'
import Link from 'next/link'

export async function UserOrLogin() {
  const serverUser = await getServerUser()
  const session = serverUser?.data
  if (session?.user) {
    // @ts-expect-error needs a prop change
    return <UserMenu user={session.user} variant="icon" />
  }
  return (
    <Button variant="link" asChild className="-ml-2">
      <Link href="/login">Login</Link>
    </Button>
  )
}
