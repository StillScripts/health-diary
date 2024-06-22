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
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Gym Session</CardTitle>
            <CardDescription>
              Record the details of your workout.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map(exercise => (
                      <SelectItem key={exercise.id} value={exercise.id}>
                        {exercise.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exercises">Exercises</Label>
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    id="exercise-name"
                    placeholder="Exercise Name"
                  />
                  <Input
                    type="number"
                    id="exercise-reps"
                    min="0"
                    placeholder="Reps"
                  />
                  <Button variant="ghost" size="icon">
                    <IconPlus className="size-4" />
                    <span className="sr-only">Add Exercise</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
