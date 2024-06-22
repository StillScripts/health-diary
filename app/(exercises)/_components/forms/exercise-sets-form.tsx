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
import { useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { nanoid } from '@/lib/utils'

export function ExerciseSetsForm({
  exercises
}: {
  exercises: Array<NonNullable<Exercise>>
}) {
  const form = useForm<ExerciseSetSchema>({
    resolver: zodResolver(exerciseSetSchema)
  })
  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'sets'
  })

  async function onSubmit(data: ExerciseSetSchema) {
    alert(JSON.stringify(data))
  }

  const getInputsFromActivityType = useCallback(
    (exerciseId: string): Array<keyof (typeof fields)[number]> => {
      const exercise = exercises.find(exercise => exercise.id === exerciseId)
      const activityType = exercise?.activityType
      switch (activityType) {
        case 'Body Weight':
          return ['reps']
        case 'Weights':
          return ['reps', 'weight']
        case 'Distance':
          return ['distance']
        default:
          return []
      }
    },
    [exercises]
  )

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
            {fields.map((field, index) => {
              const enabledInputs = getInputsFromActivityType(field.exercise_id)
              return (
                <div key={index}>
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
                              <SelectValue placeholder="Select an exercise" />
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
                  {enabledInputs.includes('weight') && (
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
                  )}
                  {enabledInputs.includes('distance') && (
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
                  )}
                  {enabledInputs.includes('reps') && (
                    <FormField
                      control={form.control}
                      name={`sets.${index}.reps`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reps</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )
            })}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  exercise_id: `es_${nanoid(10)}`,
                  distance: '',
                  reps: 0,
                  weight: ''
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
