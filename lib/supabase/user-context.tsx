'use client'

import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect
} from 'react'
import { use } from 'react'
import type { SupabaseSession } from './server'

type UserContextType = {
	user: SupabaseSession | null
	setUser: (user: SupabaseSession | null) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function useUser(): UserContextType {
	let context = useContext(UserContext)
	if (context === null) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}

export type UserPromise = Promise<SupabaseSession | null>

export function UserProvider({
	children,
	userPromise
}: {
	children: ReactNode
	userPromise: UserPromise
}) {
	let initialUser = use(userPromise)
	let [user, setUser] = useState<SupabaseSession | null>(initialUser)

	useEffect(() => {
		setUser(initialUser)
	}, [initialUser])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
