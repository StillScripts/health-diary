import { ChatHeader } from '@/app/(chat)/_components/layout/chat-header'
import { SidebarDesktop } from '@/app/(chat)/_components/layout/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatHeader />
      <main className="flex flex-col flex-1 bg-muted/50">
        <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
          <SidebarDesktop />
          {children}
        </div>
      </main>
    </div>
  )
}
