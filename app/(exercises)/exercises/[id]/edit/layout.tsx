import { ExercisePageHeader } from '@/app/(exercises)/_components/layout/exercise-page-header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ExercisePageHeader
        heading="Record Exercise Activity"
        backUrl="/exercises"
      />
      {children}
    </>
  )
}
