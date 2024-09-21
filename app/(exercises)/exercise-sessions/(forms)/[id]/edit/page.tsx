import ExerciseSessionForm from '@/app/(exercises)/_components/exercise-session-form'
import { app } from '@/app/treaty'

import { notFound } from 'next/navigation'

export const metadata = {
	title: 'Edit Exercise Session'
}

const EditExerciseEvent = async ({
	params,
	searchParams
}: {
	params: { id: string }
	searchParams?: { tab?: string }
}) => {
	const exerciseEvent = await app.api['exercise-events']
		['with-sets']({
			id: params.id
		})
		.get()
	const exercises = await app.api.exercises.index.get()

	if (exerciseEvent.error || exercises.error) {
		notFound()
	}

	return (
		<ExerciseSessionForm
			exerciseEvent={exerciseEvent.data!}
			exercises={exercises.data}
			tab={searchParams?.tab}
		/>
	)
}

export default EditExerciseEvent
