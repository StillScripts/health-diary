'use client'
import Link from 'next/link'
import {
  Dumbbell,
  FileClock,
  Home,
  Package,
  Package2,
  Settings,
  ShoppingCart
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const ExerciseSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:size-8 md:text-base"
        >
          <Package2 className="size-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className={cn(
                'flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8',
                pathname === '/' && 'bg-accent text-accent-foreground'
              )}
            >
              <Home className="size-5" />
              <span className="sr-only">Home</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/exercises"
              className={cn(
                'flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8',
                pathname === '/exercises' && 'bg-accent text-accent-foreground'
              )}
            >
              <Dumbbell className="size-5" />
              <span className="sr-only">Exercises</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Exercises</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/exercise-sessions"
              className={cn(
                'flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8',
                pathname === '/exercise-sessions' &&
                  'bg-accent text-accent-foreground'
              )}
            >
              <FileClock className="size-5" />
              <span className="sr-only">Exercise Sessions</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Exercise Sessions</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
            >
              <Settings className="size-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
