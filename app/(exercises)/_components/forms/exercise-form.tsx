'use client'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import {
	type ExerciseSchema,
	exerciseSchema,
	activityTypes
} from '@/lib/validators/exercise-validator'
import { type Exercise } from '@/app/(server)/actions/exercises'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { SubmittingButton } from '@/components/pending-button'
import { FormToast } from '@/components/form-toast'
import { app } from '@/app/treaty'
import { useRouter } from 'next/navigation'
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

export function ExerciseForm({
	exercise,
	userId
}: {
	exercise?: NonNullable<Exercise>
	userId: string
}) {
	const router = useRouter()
	const form = useForm<ExerciseSchema>({
		resolver: zodResolver(exerciseSchema),
		defaultValues: {
			title: exercise?.title ?? '',
			description: exercise?.description ?? '',
			activityType: exercise?.activityType ?? 'Body Weight'
		}
	})
	const { handleResponse } = useErrorOrRedirect()

	/** Create or update an exercise entry */
	async function onSubmit(userData: ExerciseSchema) {
		if (!exercise?.id) {
			const { error } = await app.api.exercises.index.post({
				...userData,
				userId
			})
			handleResponse(error, '/exercises')
		} else {
			const { error } = await app.api
				.exercises({ id: exercise.id })
				.patch(userData)
			handleResponse(error, '/exercises')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Card className="mx-auto w-full max-w-md">
					<CardHeader>
						<CardTitle>Exercise</CardTitle>
						<CardDescription>
							Set the title and description of an exercise activity.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Title..." {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Notes..." {...field} />
									</FormControl>
									<FormDescription>
										Describe this exercise (optional).
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'activityType'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Activity Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an activity type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{activityTypes.map(activity => (
												<SelectItem key={activity} value={activity}>
													{activity}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex justify-end">
						<SubmittingButton>Save</SubmittingButton>
					</CardFooter>
				</Card>
				<FormToast title="Success" description="Exercise successfuly updated" />
			</form>
		</Form>
	)
}
