import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

config({ path: '.env.local' })

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// })

// export const db = drizzle(pool, {
//   schema,
// })

const client = postgres(process.env.DATABASE_URL!, { prepare: false })

export const db = drizzle(client, { schema })
