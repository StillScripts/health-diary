'use client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useErrorOrRedirect = () => {
	const router = useRouter()

	const handleResponse = useCallback(
		(error: unknown, path: string) => {
			if (error) {
				throw new Error('An error occurred')
			}
			router.push(path)
		},
		[router]
	)

	return { handleResponse }
}
