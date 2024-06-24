'use client'
import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from './ui/button'
import { IconSpinner } from './ui/icons'
import { useFormState } from 'react-hook-form'

export const PendingButton = ({
  children,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} aria-disabled={pending} {...props}>
      {pending ? <IconSpinner /> : children}
    </Button>
  )
}

export const SubmittingButton = ({
  children,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
  const { isSubmitting } = useFormState()
  return (
    <Button disabled={isSubmitting} aria-disabled={isSubmitting} {...props}>
      {isSubmitting ? <IconSpinner /> : children}
    </Button>
  )
}
