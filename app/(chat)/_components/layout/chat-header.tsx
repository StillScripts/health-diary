import Link from 'next/link'

import { IconNextChat } from '@/components/ui/icons'
import { SidebarMobile } from '@/components/sidebar-mobile'
import { SidebarToggle } from '@/components/sidebar-toggle'
import { ChatHistory } from '@/components/chat-history'
import { getServerUser } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { UserOrLogin } from '@/components/user-or-login'

async function AuthenticatedSidebar() {
  const serverUser = await getServerUser()
  const session = serverUser?.data
  if (session?.user) {
    return (
      <>
        <SidebarMobile>
          <ChatHistory userId={session.user?.id} />
        </SidebarMobile>
        <SidebarToggle />
      </>
    )
  }
  return (
    <Link href="/new" rel="nofollow">
      <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
      <IconNextChat className="hidden size-6 mr-2 dark:block" />
    </Link>
  )
}

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <AuthenticatedSidebar />
        </Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Suspense fallback={null}>
          <UserOrLogin />
        </Suspense>
      </div>
    </header>
  )
}
