import React from 'react'
import { ExerciseSidebar } from './_components/layout/exercise-sidebar'
import { ExerciseHeader } from './_components/layout/exercise-header'

export default function ExerciseAppLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <ExerciseSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <ExerciseHeader />
        {children}
      </div>
    </div>
  )
}
