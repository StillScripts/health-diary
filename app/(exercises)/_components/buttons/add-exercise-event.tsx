'use client'

import { createExerciseEvent } from '@/app/(server)/actions/exercise-sessions'
import { createExercise } from '@/app/(server)/actions/exercises'
import { PendingButton } from '@/components/pending-button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export const AddExerciseEventButton = () => {
  const router = useRouter()
  const [result, dispatch] = useFormState(createExerciseEvent, { error: false })

  useEffect(() => {
    if (result?.success && result?.id) {
      router.push(`/exercise-sessions/${result.id}/edit`)
    } else if (result?.error) {
      alert(result.error)
    }
  }, [result?.error, result?.id, result?.success, router])

  return (
    <form action={dispatch}>
      <PendingButton size="sm">Record New Session</PendingButton>
    </form>
  )
}
