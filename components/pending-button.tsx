'use client'
import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from './ui/button'

export const PendingButton = ({
  children,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} {...props}>
      {pending ? 'Loading' : children}
    </Button>
  )
}
