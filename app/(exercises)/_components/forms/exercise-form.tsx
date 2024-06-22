'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  type ExerciseSchema,
  exerciseSchema
} from '@/lib/validators/exercise-validator'
import { type Exercise } from '@/app/(server)/actions/exercises'

export function ExerciseForm({ exercise }: { exercise: Exercise }) {
  const form = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      title: exercise?.title ?? '',
      description: exercise?.title ?? ''
    }
  })

  async function onSubmit(data: ExerciseSchema) {
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notes..." {...field} />
                  </FormControl>
                  <FormDescription>Describe this exercise.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
