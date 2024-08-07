import { Sidebar } from '@/app/(chat)/_components/layout/sidebar'

import { ChatHistory } from '@/app/(chat)/_components/chat-history'
import { getServerUser } from '@/lib/supabase/server'

export async function SidebarDesktop() {
  const session = await getServerUser()

  if (!session?.data?.user?.id) {
    return null
  }

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <ChatHistory userId={session.data?.user?.id} />
    </Sidebar>
  )
}
