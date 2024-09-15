import { Elysia } from 'elysia'

import { exercisesRouter } from '@/app/(server)/routers/exercises'

//https://github.com/tanishqmanuja/todos-react-elysia/tree/main/server

const app = new Elysia({ prefix: '/api' })
	.use(exercisesRouter)
	.get('/', () => 'hello Next')

export const GET = app.handle
export const POST = app.handle
