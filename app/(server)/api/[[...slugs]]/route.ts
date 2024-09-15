import { Elysia } from 'elysia'

import { exercisesRouter } from '@/app/(server)/routers/exercises'
import { exerciseEventsRouter } from '@/app/(server)/routers/exercise-events'

export const dynamic = 'force-dynamic'

//https://github.com/tanishqmanuja/todos-react-elysia/tree/main/server

const app = new Elysia({ prefix: '/api' })
	.use(exercisesRouter)
	.use(exerciseEventsRouter)
	.get('/', () => 'hello Next')

export type App = typeof app

export const GET = app.handle
export const POST = app.handle
