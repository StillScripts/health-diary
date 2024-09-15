import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'
import { app } from '@/app/treaty'
import { getServerUser } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

const EditExercise = async ({ params }: { params: { id: string } }) => {
	const session = await getServerUser()
	if (!session?.data?.user?.id || !params.id) {
		redirect('/exercises')
	}

	const { data, error } = await app.api.exercises({ id: params.id }).get()

	if (error) {
		notFound()
	}

	return <ExerciseForm exercise={data} />
}

export default EditExercise
