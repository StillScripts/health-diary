'use client'

import { useFormState } from 'react-dom'
import { signup } from '@/app/(server)/auth'
import Link from 'next/link'
import { PendingButton } from '@/components/pending-button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function SignupForm() {
  // @ts-expect-error (will sort later)
  const [, dispatch] = useFormState(signup, undefined)

  return (
    <form
      action={dispatch}
      className="flex flex-col items-center gap-4 space-y-3"
    >
      <Card className="sm:min-w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Sign up for an account!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <PendingButton size="lg" className="w-full">
            Sign Up
          </PendingButton>
        </CardFooter>
      </Card>

      <Link href="/login" className="flex flex-row gap-1 text-sm text-zinc-400">
        Already have an account?
        <div className="font-semibold underline">Log in</div>
      </Link>
    </form>
  )
}
