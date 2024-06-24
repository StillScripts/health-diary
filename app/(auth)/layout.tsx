export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center p-4">
      {children}
    </main>
  )
}
