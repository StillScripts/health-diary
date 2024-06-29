'use client'
import { deleteExercise, type Exercise } from '@/app/(server)/actions/exercises'
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

export const DeleteExerciseButton = ({
  exercise
}: {
  exercise: NonNullable<Exercise>
}) => {
  const [result, dispatch] = useFormState(deleteExercise, { error: false })
  useEffect(() => {
    if (result.success) {
      alert('success')
    } else if (result.error) {
      alert('error')
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
            This will permanently delete the {exercise.title} exercise from your
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={dispatch}>
            <input
              name="id"
              value={exercise.id}
              className="hidden"
              hidden
            ></input>
            <AlertDialogAction asChild>
              <PendingButton type="submit">Confirm</PendingButton>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
