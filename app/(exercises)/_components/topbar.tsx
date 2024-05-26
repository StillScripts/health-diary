'use client'

import { createExerciseEvent } from '@/app/(server)/actions/exercise-sessions'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export const Topbar = () => {
  const router = useRouter()
  const [result, dispatch] = useFormState(createExerciseEvent, { error: false })

  useEffect(() => {
    if (result?.success && result?.id) {
      router.push(`/exercise-sessions/${result.id}/edit`)
    }
  }, [result.id, result?.success, router])

  return (
    <form action={dispatch}>
      <Button>Record New Session</Button>
    </form>
  )
}
