'use client'
import {
  type ExerciseEvent,
  deleteExerciseEvent
} from '@/app/(server)/actions/exercise-events'
import { PendingButton } from '@/components/pending-button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

export const DeleteExerciseEventButton = ({
  exerciseEvent
}: {
  exerciseEvent: Omit<NonNullable<ExerciseEvent>, 'exerciseSets'>
}) => {
  const [result, dispatch] = useFormState(deleteExerciseEvent, { error: false })
  useEffect(() => {
    if (result.success) {
      toast('Success', {
        description: 'Exercise session has been deleted'
      })
    } else if (result.error) {
      toast('Error', {
        description: 'Exercise session was not able to be deleted'
      })
    }
  }, [result.error, result.success])
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this exercise session and all of the
            activities asociated with it
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={dispatch}>
            <input
              name="id"
              value={exerciseEvent.id}
              className="hidden"
              hidden
            ></input>
            <AlertDialogAction type="submit" className="w-full sm:w-auto">
              Confirm
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
