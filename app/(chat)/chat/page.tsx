import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { getMissingKeys } from '@/app/actions'
import { getServerUser } from '@/lib/supabase/server'

export const metadata = {
  title: 'Health Diary'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = await getServerUser()
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session?.data} missingKeys={missingKeys} />
    </AI>
  )
}
