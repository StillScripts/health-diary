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
import { ExerciseEventForm } from './exercise-event-form'
import type { ExerciseEvent } from '@/app/(server)/actions/exercise-events'

export default function ExerciseSessionForm({
  exerciseEvent
}: {
  exerciseEvent: ExerciseEvent
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
        {/* <Card className="w-full max-w-md mx-auto">
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
                <Select id="workout-type">
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                    <PlusIcon className="w-4 h-4" />
                    <span className="sr-only">Add Exercise</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input type="number" id="duration" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any notes about your session"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save</Button>
          </CardFooter>
        </Card> */}
        <ExerciseEventForm exerciseEvent={exerciseEvent} />
      </TabsContent>
      <TabsContent value={TABS[1]}>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
