'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const StartAChat = () => {
	const router = useRouter()
	const [start, setStart] = useState('')
	return (
		<div className="relative ml-auto flex-1 md:grow-0">
			<Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
			<form
				onSubmit={e => {
					e.preventDefault()
					router.push(`/chat?start=${start}`)
				}}
			>
				<Input
					type="search"
					name="start"
					onChange={e => setStart(e.target.value)}
					placeholder="Start a chat"
					className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
				/>
			</form>
		</div>
	)
}
