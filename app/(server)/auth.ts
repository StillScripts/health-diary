'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { zfd } from 'zod-form-data'

const authValidator = zfd.formData({
  email: zfd.text(),
  password: zfd.text()
})

interface Result {
  type: string
  resultCode: any
}

export async function login(
  _prevState: Result | undefined,
  formData: FormData
) {
  const supabase = createClient()
  const data = authValidator.parse(formData)
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
  const data = authValidator.parse(formData)
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = createClient()
  supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
