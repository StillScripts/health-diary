'use client'
import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from './ui/button'
import { IconSpinner } from './ui/icons'

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
