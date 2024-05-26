'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

interface Result {
  type: string
  resultCode: any
}

export async function login(
  _prevState: Result | undefined,
  formData: FormData
) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }
  console.log(data)

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
