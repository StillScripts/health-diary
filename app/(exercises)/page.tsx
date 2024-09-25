import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="p-8">
			<h1 className="mb-6 text-2xl">Welcome :)</h1>
			<Button asChild>
				<Link href="/exercise-sessions/new">New Exercise Session</Link>
			</Button>
		</div>
	)
}
