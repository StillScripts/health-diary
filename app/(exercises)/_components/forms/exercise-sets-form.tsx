'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
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
import { useFieldArray, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { type Exercise } from '@/app/(server)/actions/exercises'
import {
	exerciseSetSchema,
	type ExerciseSetSchema
} from '@/lib/validators/exercise-set-validator'
import { useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { nanoid } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { upsertExerciseSets } from '@/app/(server)/actions/exercise-sets'
import type { ExerciseEvent } from '@/app/(server)/actions/exercise-events'
import { SubmittingButton } from '@/components/pending-button'

export function ExerciseSetsForm({
	exercises,
	exerciseSets,
	exerciseEventId
}: {
	exercises?: Array<NonNullable<Exercise>>
	exerciseSets?: NonNullable<ExerciseEvent>['exerciseSets']
	exerciseEventId?: string
}) {
	const form = useForm<ExerciseSetSchema>({
		resolver: zodResolver(exerciseSetSchema),
		defaultValues: {
			sets: exerciseSets
				? exerciseSets.map(exerciseSet => ({
						id: exerciseSet.id,
						exerciseId: exerciseSet.exerciseId!,
						reps: exerciseSet.reps || undefined,
						weight: exerciseSet.weight ?? '',
						distance: exerciseSet.distance ?? ''
					}))
				: []
		}
	})
	const { fields, append } = useFieldArray({
		control: form.control,
		name: 'sets'
	})

	const getInputsFromActivityType = (
		exerciseId: string
	): Array<keyof (typeof fields)[number]> => {
		const exercise = exercises?.find(exercise => exercise.id === exerciseId)
		const activityType = exercise?.activityType
		switch (activityType) {
			case 'Body Weight':
				return ['reps']
			case 'Weights':
				return ['reps', 'weight']
			case 'Distance':
				return ['distance']
			default:
				return []
		}
	}

	const [enabledInputs, setEnabledInputs] = useState<
		Array<keyof (typeof fields)[number]>[]
	>(
		exerciseSets?.length
			? exerciseSets.map(exerciseSet =>
					getInputsFromActivityType(exerciseSet.exerciseId!)
				)
			: []
	)

	async function onSubmit(data: ExerciseSetSchema) {
		await upsertExerciseSets({ ...data, exerciseEventId })
			.then(d => {
				console.log(JSON.stringify(d))
			})
			.catch(error => {
				console.log(error)
				alert('An error occurred')
			})
	}

	const updateEnabledInputs = (exerciseId: string, index: number) => {
		setEnabledInputs(prevEnabledInputs => {
			const newEnabledInputs = [...prevEnabledInputs]
			newEnabledInputs[index] = getInputsFromActivityType(exerciseId)
			return newEnabledInputs
		})
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
						{fields.map((field, index) => {
							return (
								<div key={index} className="space-y-3">
									<FormField
										control={form.control}
										name={`sets.${index}.exerciseId`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Exercise</FormLabel>
												<Select
													onValueChange={value => {
														field.onChange(value)
														updateEnabledInputs(value, index)
													}}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select an exercise" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{exercises.map(exercise => (
															<SelectItem key={exercise.id} value={exercise.id}>
																{exercise.title}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									{enabledInputs[index]?.includes('weight') && (
										<FormField
											control={form.control}
											name={`sets.${index}.weight`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Weight</FormLabel>
													<FormControl>
														<Input placeholder="10kg" {...field} />
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									)}
									{enabledInputs[index]?.includes('distance') && (
										<FormField
											control={form.control}
											name={`sets.${index}.distance`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Distance</FormLabel>
													<FormControl>
														<Input placeholder="2 km" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
									{enabledInputs[index]?.includes('reps') && (
										<FormField
											control={form.control}
											name={`sets.${index}.reps`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Reps</FormLabel>
													<FormControl>
														<Input type="number" placeholder="10" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
									<Separator className="mt-2" orientation="horizontal" />
								</div>
							)
						})}
						<Button
							type="button"
							variant="outline"
							onClick={() =>
								append({
									id: `es_${nanoid(10)}`,
									exerciseId: '',
									distance: '',
									reps: undefined,
									weight: ''
								})
							}
						>
							Add
						</Button>
					</CardContent>
					<CardFooter className="flex justify-end">
						<SubmittingButton>Save</SubmittingButton>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}
