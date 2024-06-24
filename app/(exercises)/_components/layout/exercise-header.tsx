import Link from 'next/link'
import {
  Dumbbell,
  FileClock,
  Home,
  Package2,
  PanelLeft,
  Search
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ExerciseBreadcrumbs } from './exercise-breadcrumbs'
import { getServerUser } from '@/lib/supabase/server'
import { UserMenu } from '@/components/user-menu'
import { Suspense } from 'react'
import { cn } from '@/lib/utils'

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
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="size-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/"
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              )}
            >
              <Home className="size-5" />
              Home
            </Link>
            <Link
              href="/exercises"
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              )}
            >
              <Dumbbell className="size-5" />
              Exercises
            </Link>
            <Link
              href="/exercise-sessions"
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              )}
            >
              <FileClock className="size-5" />
              Exercise Sessions
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
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
