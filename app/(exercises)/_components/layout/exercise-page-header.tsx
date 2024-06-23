import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
//import type { Route } from 'next'
import Link from 'next/link'

export const ExercisePageHeader = ({
  heading,
  children,
  inProgress,
  backUrl
}: {
  heading: string
  children?: React.ReactNode
  inProgress?: boolean
  backUrl?: string
}) => {
  return (
    <div className="flex items-center flex-wrap gap-4">
      {backUrl && (
        <Button variant="outline" size="icon" className="size-7" asChild>
          <Link href={backUrl}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
      )}
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        {heading}
      </h1>
      {inProgress && (
        <Badge variant="outline" className="ml-auto sm:ml-0">
          In progress
        </Badge>
      )}
      {children && (
        <div className="items-center gap-2 md:ml-auto md:flex">{children}</div>
      )}
    </div>
  )
}
