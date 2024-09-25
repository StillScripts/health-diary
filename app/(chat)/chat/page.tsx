import { nanoid } from '@/lib/utils'
import { Chat } from '@/app/(chat)/_components/chat'
import { AI } from '@/lib/chat/actions'
import { getMissingKeys } from '@/app/actions'
import { getServerUser } from '@/lib/supabase/server'

export const metadata = {
	title: 'Chat'
}

export default async function IndexPage() {
	const id = nanoid()
	const session = await getServerUser()
	const missingKeys = await getMissingKeys()

	return (
		<AI initialAIState={{ chatId: id, messages: [] }}>
			<Chat id={id} session={session} missingKeys={missingKeys} />
		</AI>
	)
}
