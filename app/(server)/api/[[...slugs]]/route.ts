
// app/api/[[...slugs]]/route.ts
import { Elysia, t } from 'elysia'

import { db } from '@/db/connection';
import { exerciseEvents, exercises } from '@/db/schema';
import { getServerUser } from '@/lib/supabase/server';

//https://github.com/itsyoboieltr/dbest-stack/blob/main/src/routes/api/todo/index.ts


const app = new Elysia({ prefix: '/api' })
    .get('/', () => 'hello Next')
    .post('/', ({ body }) => body, {
        body: t.Object({
            name: t.String()
        })
    })
    .get('/demo', ()=>({hello:'world'}))
    .get('/exercise-events', async () => await db.select().from(exerciseEvents), {
        // TODO check auth before any other action
        beforeHandle({ set, cookie: { session } }) {
            if (!session?.cookie?.domain) {
                return (set.status = 'Unauthorized')
            }
        }
    })
    .get('/exercises', async () => await db.select().from(exercises))

export const GET = app.handle 
export const POST = app.handle 