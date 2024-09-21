'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExerciseEventForm } from './forms/exercise-event-form'
import type { ExerciseEvent } from '@/app/(server)/actions/exercise-events'
import type { Exercise } from '@/app/(server)/actions/exercises'
import { ExerciseSetsForm } from './forms/exercise-sets-form'
import { usePathname, useRouter } from 'next/navigation'
import type { Route } from 'next'

const TABS = ['Summary', 'Activities'] as const
export type ExerciseSessionFormTab = (typeof TABS)[number]

export default function ExerciseSessionForm({
	exerciseEvent,
	exercises,
	tab
}: {
	exerciseEvent?: NonNullable<ExerciseEvent>
	exercises?: Array<NonNullable<Exercise>>
	tab?: string
}) {
	const router = useRouter()
	const pathname = usePathname()
	const index = TABS.findIndex(t => t.toLowerCase() === tab)

	return (
		<Tabs
			value={TABS[index >= 0 ? index : 0]}
			onValueChange={value =>
				router.replace(`${pathname}?tab=${value.toLowerCase()}` as Route)
			}
			className="w-[400px]"
		>
			<TabsList className="grid w-full grid-cols-2">
				{TABS.map(tab => (
					<TabsTrigger
						key={tab}
						value={tab}
						disabled={!pathname.includes('edit')}
					>
						{tab}
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent value={TABS[0]}>
				<ExerciseEventForm exerciseEvent={exerciseEvent} />
			</TabsContent>
			<TabsContent value={TABS[1]}>
				<ExerciseSetsForm
					exercises={exercises}
					exerciseSets={exerciseEvent?.exerciseSets}
					exerciseEventId={exerciseEvent?.id}
				/>
			</TabsContent>
		</Tabs>
	)
}
