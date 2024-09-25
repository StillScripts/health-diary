import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
	const cookieStore = cookies()
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll()
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options)
					)
				}
			}
		}
	)
}

export async function getServerUser() {
	try {
		const supabase = createClient()
		const user = await supabase.auth.getUser()
		if (user?.data?.user) {
			return user
		}
		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export type SupabaseSession = Awaited<ReturnType<typeof getServerUser>>
