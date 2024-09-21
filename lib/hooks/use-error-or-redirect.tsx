'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useErrorOrRedirect = () => {
	const router = useRouter()
	const pathname = usePathname()

	const handleResponse = useCallback(
		(error: unknown, path: string) => {
			if (error) {
				throw new Error('An error occurred')
			}
			if (pathname !== path) {
				router.push(path)
			}

			router.refresh()
		},
		[pathname, router]
	)

	return { handleResponse }
}
