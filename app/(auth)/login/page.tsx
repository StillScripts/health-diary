import LoginForm from '@/app/(auth)/_components/login-form'
import { getServerUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Log In'
}

export default async function LoginPage() {
  const session = await getServerUser()

  if (session?.data?.user) {
    redirect('/chat')
  }

  return <LoginForm />
}
