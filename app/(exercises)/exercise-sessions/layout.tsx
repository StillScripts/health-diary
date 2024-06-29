import React from 'react'
import { ExerciseMainContainer } from '../_components/layout/exercise-main-container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ExerciseMainContainer>{children}</ExerciseMainContainer>
}
