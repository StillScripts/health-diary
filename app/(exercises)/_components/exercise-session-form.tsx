import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExerciseEventForm } from './forms/exercise-event-form'
import type { ExerciseEvent } from '@/app/(server)/actions/exercise-events'
import type { Exercise } from '@/app/(server)/actions/exercises'
import { ExerciseSetsForm } from './forms/exercise-sets-form'

export default function ExerciseSessionForm({
  exerciseEvent,
  exercises
}: {
  exerciseEvent: NonNullable<ExerciseEvent>
  exercises: Array<NonNullable<Exercise>>
}) {
  const TABS = ['Summary', 'Acivities']
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
        <ExerciseSetsForm
          exercises={exercises}
          exerciseSets={exerciseEvent.exerciseSets}
          exerciseEventId={exerciseEvent.id}
        />
      </TabsContent>
    </Tabs>
  )
}
