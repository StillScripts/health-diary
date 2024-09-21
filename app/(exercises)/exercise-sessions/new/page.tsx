import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'
import { getServerUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
	title: 'New Exercise'
}

const NewExercise = async () => {
	const session = await getServerUser()
	const userId = session?.data?.user?.id
	if (!userId) {
		redirect('/exercises')
	}

	return <ExerciseForm userId={userId} />
}

export default NewExercise
