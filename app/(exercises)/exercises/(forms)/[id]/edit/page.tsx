import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'
import { app } from '@/app/treaty'
import { notFound } from 'next/navigation'

const EditExercise = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await app.api.exercises({ id: params.id }).get()

	if (error) {
		notFound()
	}

	return <ExerciseForm exercise={data} />
}

export default EditExercise
