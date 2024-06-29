import SignupForm from '@/app/(auth)/_components/signup-form'
import { getServerUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Sign Up'
}

export default async function SignupPage() {
  const session = await getServerUser()

  if (session?.data?.user) {
    redirect('/')
  }

  return <SignupForm />
}
