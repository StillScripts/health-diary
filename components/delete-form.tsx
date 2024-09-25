'use client'
import { Form } from '@/components/ui/form'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, type ButtonProps } from './ui/button'
import { app } from '@/app/treaty'
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

export function DeleteForm({
	buttonProps,
	title = 'Are you sure?',
	description = `This will permanently delete this item.`,
	id,
	apiRouteKey
}: {
	title?: string
	description?: string
	buttonProps?: ButtonProps
	id: string
	apiRouteKey: keyof (typeof app)['api']
}) {
	const { handleResponse } = useErrorOrRedirect()

	const handleDelete = async () => {
		let response = { error: null }
		switch (apiRouteKey) {
			case 'exercise-events':
				response = await app.api['exercise-events']({ id }).delete()
				handleResponse(response.error, '/exercise-sessions')
			default:
				response = await app.api.exercises({ id }).delete()
				handleResponse(response.error, '/exercises')
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="sm" variant="destructive" {...buttonProps}>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<div className="space-y-8">
						<AlertDialogAction
							onClick={handleDelete}
							className="w-full sm:w-auto"
						>
							Confirm
						</AlertDialogAction>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
