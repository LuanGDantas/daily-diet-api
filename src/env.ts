import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  DATABASE_URL: z.string(),
})

const { success, data, error } = envSchema.safeParse(process.env)
if (!success) {
  console.error('⚠️ Invalid environment variables', error.format())

  throw new Error('Invalid enviroment variables.')
}

export const env = data
