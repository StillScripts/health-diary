
// app/api/[[...slugs]]/route.ts
import { Elysia, t } from 'elysia'

import { db } from '@/db/connection';
import { exerciseEvents, exercises } from '@/db/schema';

//https://github.com/itsyoboieltr/dbest-stack/blob/main/src/routes/api/todo/index.ts


const app = new Elysia({ prefix: '/api' })
    .get('/', () => 'hello Next')
    .post('/', ({ body }) => body, {
        body: t.Object({
            name: t.String()
        })
    })
    .get('/demo', ()=>({hello:'world'}))
    .get('/exercise-events', async () => await db.select().from(exerciseEvents))
    .get('/exercises', async () => await db.select().from(exercises))

export const GET = app.handle 
export const POST = app.handle 