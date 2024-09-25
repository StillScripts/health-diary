import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import { getServerUser } from '@/lib/supabase/server'

export const metadata = {
	metadataBase: process.env.VERCEL_URL
		? new URL(`https://${process.env.VERCEL_URL}`)
		: new URL('https://health-diary-theta.vercel.app'),
	title: {
		default: 'Health Diary',
		template: `%s - Health Diary`
	},
	description: 'Track your workouts, activities and diet.',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png'
	},
	manifest: '/manifest.json'
}

export const viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' }
	]
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	const userPromise = getServerUser()
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					'font-sans antialiased',
					GeistSans.variable,
					GeistMono.variable
				)}
			>
				<Toaster position="top-center" />
				<Providers
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					userPromise={userPromise}
				>
					{children}
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	)
}
