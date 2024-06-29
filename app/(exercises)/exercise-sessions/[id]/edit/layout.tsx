import React from 'react'
import { ExercisePageHeader } from '@/app/(exercises)/_components/layout/exercise-page-header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ExercisePageHeader
        heading="Record Exercise Session"
        backUrl="/exercise-sessions"
      />
      {children}
    </>
  )
}
