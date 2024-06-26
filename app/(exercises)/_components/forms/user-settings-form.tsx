'use client'
import { updateUser } from '@/app/(server)/actions/user-settings'
import { PendingButton } from '@/components/pending-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'

export const UserSettingsForm = () => {
  const [, dispatch] = useFormState(updateUser, { error: false })

  return (
    <form action={dispatch}>
      <Card>
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
          <CardDescription>Update your first and last name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="First Name" name="firstName" required />
            <Input placeholder="Last Name" name="lastName" required />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <PendingButton>Save</PendingButton>
        </CardFooter>
      </Card>
    </form>
  )
}
