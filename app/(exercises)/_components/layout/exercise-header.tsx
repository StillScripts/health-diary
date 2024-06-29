import Link from 'next/link'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ExerciseBreadcrumbs } from './exercise-breadcrumbs'
import { getServerUser } from '@/lib/supabase/server'
import { UserMenu } from '@/components/user-menu'
import { Suspense } from 'react'
import { ExerciseMobileSidebar } from './exercise-mobile-sidebar'

async function UserOrLogin() {
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

export const ExerciseHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <ExerciseMobileSidebar />
      <ExerciseBreadcrumbs />

      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Start a chat"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <Suspense fallback={null}>
        <UserOrLogin />
      </Suspense>
    </header>
  )
}
