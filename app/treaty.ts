import { treaty } from '@elysiajs/eden'
import { type App } from '@/app/(server)/api/[[...slugs]]/route'

let url = 'http://localhost:3000'
if (process.env.VERCEL_ENV === 'preview') {
	url = 'https://' + process.env.VERCEL_BRANCH_URL
} else if (process.env.VERCEL_ENV === 'production') {
	url = 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
} else if (process.env.NODE_ENV === 'production') {
	url = 'https://health-diary-theta.vercel.app'
}

export const app = treaty<App>(url, {})
