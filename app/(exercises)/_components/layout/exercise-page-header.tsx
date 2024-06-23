import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export const ExercisePageHeader = ({
  heading,
  children,
  inProgress
}: {
  heading: string
  children: React.ReactNode
  inProgress?: boolean
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" className="size-7">
        <ChevronLeft className="size-4" />
        <span className="sr-only">Back</span>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        {heading}
      </h1>
      {inProgress && (
        <Badge variant="outline" className="ml-auto sm:ml-0">
          In progress
        </Badge>
      )}
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        {children}
      </div>
    </div>
  )
}
