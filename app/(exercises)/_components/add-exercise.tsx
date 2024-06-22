'use client'

import { createExercise } from '@/app/(server)/actions/exercises'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export const AddExerciseButton = () => {
  const router = useRouter()
  const [result, dispatch] = useFormState(createExercise, { error: false })

  useEffect(() => {
    if (result?.success && result?.id) {
      router.push(`/exercises/${result.id}/edit`)
    } else if (result?.error) {
      alert(result.error)
    }
  }, [result?.error, result?.id, result?.success, router])

  return (
    <form action={dispatch}>
      <Button>Create Exercise</Button>
    </form>
  )
}
