import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/app/(chat)/_components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { getServerUser } from '@/lib/supabase/server'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await getServerUser()

  if (!session?.data?.user) {
    return {}
  }

  const chat = await getChat(params.id, session?.data?.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getServerUser()

  const missingKeys = await getMissingKeys()

  if (!session?.data?.user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const userId = session.data.user.id as string
  const chat = await getChat(params.id, userId)

  if (!chat) {
    redirect('/chat')
  }

  if (chat?.userId !== session?.data?.user?.id) {
    notFound()
  }

  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat
        id={chat.id}
        session={session?.data}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
