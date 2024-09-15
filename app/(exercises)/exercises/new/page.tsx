import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'
import { getServerUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
	title: 'New Exercise'
}

const EditExercise = async () => {
	const session = await getServerUser()
	if (!session?.data?.user?.id) {
		redirect('/exercises')
	}

	return <ExerciseForm />
}

export default EditExercise
