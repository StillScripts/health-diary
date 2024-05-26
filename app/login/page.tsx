import LoginForm from '@/components/login-form'
import { getServerUser } from '@/lib/supabase/server'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await getServerUser()

  if (session?.data?.user) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  )
}
