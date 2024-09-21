'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { UserProvider, type UserPromise } from '@/lib/supabase/user-context'

export function Providers({
	children,
	userPromise,
	...props
}: ThemeProviderProps & { userPromise: UserPromise }) {
	return (
		<NextThemesProvider {...props}>
			<UserProvider userPromise={userPromise}>
				<SidebarProvider>
					<TooltipProvider>{children}</TooltipProvider>
				</SidebarProvider>
			</UserProvider>
		</NextThemesProvider>
	)
}
