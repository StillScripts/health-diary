import { Elysia } from 'elysia'

import { exercisesRouter } from '@/app/(server)/routers/exercises'
import { exerciseEventsRouter } from '@/app/(server)/routers/exercise-events'
import swagger from '@elysiajs/swagger'
import { logger } from '@tqman/nice-logger'

// Never cache this api, cache only on the frontend
export const dynamic = 'force-dynamic'

// Example: https://github.com/tanishqmanuja/todos-react-elysia/tree/main/server

const app = new Elysia({ prefix: '/api' })
	.use(swagger())
	.use(logger())
	.use(exercisesRouter)
	.use(exerciseEventsRouter)
	.get('/', () => 'hello Next')

export type App = typeof app

export const GET = app.handle
export const PATCH = app.handle
export const PUT = app.handle
export const POST = app.handle
export const DELETE = app.handle
