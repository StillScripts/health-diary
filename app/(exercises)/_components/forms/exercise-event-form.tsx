'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '@/components/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { type ExerciseEvent } from '@/app/(server)/actions/exercise-events'
import {
	type ExerciseEventSchema,
	exerciseEventSchema
} from '@/lib/validators/exercise-event-validator'
import { SubmittingButton } from '@/components/pending-button'
import { app } from '@/app/treaty'
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'
import { useUserSession } from '@/lib/supabase/user-context'

const getHoursAndMinutes = (date?: Date | null) => {
	if (!date) {
		return undefined
	}
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	return `${hours}:${minutes}`
}

export function ExerciseEventForm({
	exerciseEvent
}: {
	exerciseEvent?: NonNullable<ExerciseEvent>
}) {
	const date = exerciseEvent?.date ? new Date(exerciseEvent.date) : new Date()

	const form = useForm<ExerciseEventSchema>({
		resolver: zodResolver(exerciseEventSchema),
		defaultValues: {
			date,
			startTime: exerciseEvent?.startTime ?? getHoursAndMinutes(date), // default to current moment
			endTime: exerciseEvent?.endTime ?? undefined,
			notes: exerciseEvent?.notes ?? undefined
		}
	})
	const { user } = useUserSession()
	const { handleResponse } = useErrorOrRedirect()

	async function onSubmit(data: ExerciseEventSchema) {
		const userId = user?.data?.user?.id
		if (!userId) {
			throw new Error('Unauthorised')
		}

		if (!exerciseEvent?.id) {
			const { error } = await app.api['exercise-events'].index.post({
				...data,
				date: data.date as unknown as string,
				userId
			})
			handleResponse(error, '/exercise-sessions')
		} else {
			const { error } = await app.api['exercise-events']({
				id: exerciseEvent.id
			}).patch({ ...data, date: data.date as unknown as string, userId })
			handleResponse(error, '/exercise-sessions')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Card className="mx-auto w-full max-w-md">
					<CardHeader>
						<CardTitle>Gym Session</CardTitle>
						<CardDescription>
							Record the details of your workout.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'PPP')
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto size-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={date =>
													date > new Date() || date < new Date('1900-01-01')
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="startTime"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Start time</FormLabel>
									<FormControl>
										<Input type="time" placeholder="Start time" {...field} />
									</FormControl>
									<FormDescription>
										The time when you started the session.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="endTime"
							render={({ field }) => (
								<FormItem>
									<FormLabel>End time</FormLabel>
									<FormControl>
										<Input type="time" placeholder="Start time" {...field} />
									</FormControl>
									<FormDescription>
										The time when you ended the session (optional).
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="notes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Notes</FormLabel>
									<FormControl>
										<Textarea placeholder="Notes..." {...field} />
									</FormControl>
									<FormDescription>
										Record any notes about this session.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex justify-end">
						<SubmittingButton>Save</SubmittingButton>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}
