import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'postgresql' // 'postgresql' | 'mysql' | 'sqlite'
})
