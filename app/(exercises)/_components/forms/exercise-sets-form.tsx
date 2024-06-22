'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useFieldArray, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { type Exercise } from '@/app/(server)/actions/exercises'
import {
  exerciseSetSchema,
  type ExerciseSetSchema
} from '@/lib/validators/exercise-set-validator'
import { Fragment } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function ExerciseSetsForm({
  exercises
}: {
  exercises: Array<NonNullable<Exercise>>
}) {
  const form = useForm<ExerciseSetSchema>({
    resolver: zodResolver(exerciseSetSchema)
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'sets' // unique name for your Field Array
    }
  )

  async function onSubmit(data: ExerciseSetSchema) {
    //await updateExercise(data)
    alert(JSON.stringify(data))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Exercise</CardTitle>
            <CardDescription>
              Set the title and description of an exercise activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <Fragment key={index}>
                <FormField
                  control={form.control}
                  name={`sets.${index}.exercise_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {exercises.map(exercise => (
                            <SelectItem key={exercise.id} value={exercise.id}>
                              {exercise.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sets.${index}.weight`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input placeholder="10kg" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sets.${index}.distance`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance</FormLabel>
                      <FormControl>
                        <Input placeholder="2 km" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Fragment>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  exercise_id: '123',
                  distance: '',
                  reps: 0,
                  weight: '',
                  activity_type: 'Body Weights'
                })
              }
            >
              Add
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
