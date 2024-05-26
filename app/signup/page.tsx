import SignupForm from '@/components/signup-form'
import { getServerUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const session = await getServerUser()

  if (session?.data?.user) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <SignupForm />
    </main>
  )
}
