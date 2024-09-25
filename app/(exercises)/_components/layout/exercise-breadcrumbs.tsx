'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export const ExerciseBreadcrumbs = () => {
	const pathname = usePathname()

	let breadcrumbs: Array<{ href?: string; name: string }> = []

	if (pathname?.endsWith('exercises')) {
		breadcrumbs.push({ name: 'Exercises' })
	} else if (pathname?.endsWith('exercise-sessions')) {
		breadcrumbs.push({ name: 'Exercise Session' })
	} else {
		if (pathname?.includes('exercises/')) {
			breadcrumbs.push({ name: 'Exercises', href: '/exercises' })
		} else if (pathname?.includes('exercise-sessions/')) {
			breadcrumbs.push({
				name: 'Exercise Sessions',
				href: '/exercise-sessions'
			})
		}
		if (pathname?.endsWith('edit')) {
			breadcrumbs.push({ name: 'Edit' })
		}
		if (pathname?.endsWith('new')) {
			breadcrumbs.push({ name: 'New' })
		}
	}

	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map(breadcrumb => (
					<Fragment key={breadcrumb.name}>
						<BreadcrumbSeparator />
						{breadcrumb?.href ? (
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href={breadcrumb.href as Route}>{breadcrumb.name}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
						) : (
							<BreadcrumbItem>
								<BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
							</BreadcrumbItem>
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
