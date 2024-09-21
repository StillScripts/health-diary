import { ExerciseForm } from '@/app/(exercises)/_components/forms/exercise-form'

export const metadata = {
	title: 'New Exercise'
}

const NewExerciseSession = async () => {
	return <ExerciseForm />
}

export default NewExerciseSession
