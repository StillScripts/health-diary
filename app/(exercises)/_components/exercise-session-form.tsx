import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExerciseEventForm } from './forms/exercise-event-form'
import type { ExerciseEvent } from '@/app/(server)/actions/exercise-events'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { IconPlus } from '@/components/ui/icons'
import type { Exercise } from '@/app/(server)/actions/exercises'
import { ExerciseSetsForm } from './forms/exercise-sets-form'

export default function ExerciseSessionForm({
  exerciseEvent,
  exercises
}: {
  exerciseEvent: NonNullable<ExerciseEvent>
  exercises: Array<NonNullable<Exercise>>
}) {
  const TABS = ['Summary', 'Exercises']
  return (
    <Tabs defaultValue={TABS[0]} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {TABS.map(tab => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={TABS[0]}>
        <ExerciseEventForm exerciseEvent={exerciseEvent} />
      </TabsContent>
      <TabsContent value={TABS[1]}>
        <ExerciseSetsForm exercises={exercises} />
      </TabsContent>
    </Tabs>
  )
}
