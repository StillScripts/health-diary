import { ExerciseBreadcrumbs } from './exercise-breadcrumbs'
import { Suspense } from 'react'
import { ExerciseMobileSidebar } from './exercise-mobile-sidebar'
import { UserOrLogin } from '@/components/user-or-login'
import { StartAChat } from './start-a-chat'

export const ExerciseHeader = () => {
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
			<ExerciseMobileSidebar />
			<ExerciseBreadcrumbs />
			<StartAChat />
			<Suspense fallback={null}>
				<UserOrLogin />
			</Suspense>
		</header>
	)
}
