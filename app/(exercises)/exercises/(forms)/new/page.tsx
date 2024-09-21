import { redirect } from 'next/navigation'
import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'
import { getServerUser } from '@/lib/supabase/server'

export const metadata = {
	title: 'New Exercise'
}

const NewExerciseSession = async () => {
	const session = await getServerUser()
	const userId = session?.data?.user?.id
	if (!userId) {
		redirect('/exercises')
	}

	return <ExerciseForm userId={userId} />
}

export default NewExerciseSession
