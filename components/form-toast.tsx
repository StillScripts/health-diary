'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-hook-form'
import { toast } from 'sonner'

export const FormToast = ({
  title,
  description
}: {
  title: string
  description: string
}) => {
  const { isSubmitSuccessful } = useFormState()
  useEffect(() => {
    if (isSubmitSuccessful) {
      toast(title, {
        description,
        position: 'bottom-right'
      })
    }
  }, [description, isSubmitSuccessful, title])
  return null
}
