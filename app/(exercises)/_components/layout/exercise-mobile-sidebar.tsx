import Link from 'next/link'
import { Dumbbell, FileClock, Home, Package2, PanelLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export const ExerciseMobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <SheetClose asChild>
            <Link
              href="#"
              className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="size-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/"
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              )}
            >
              <Home className="size-5" />
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/exercises"
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              )}
            >
              <Dumbbell className="size-5" />
              Exercises
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/exercise-sessions"
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              )}
            >
              <FileClock className="size-5" />
              Exercise Sessions
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
