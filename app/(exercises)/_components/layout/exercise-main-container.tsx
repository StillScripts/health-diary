export const ExerciseMainContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main className="mt-4 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        {children}
      </div>
    </main>
  )
}
