import { FastifyInstance } from 'fastify'
import { connection } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { name, description, dateTime, isOnDiet } = z
        .object({
          name: z.string(),
          description: z.string(),
          dateTime: z.coerce.string().datetime({ offset: true }),
          isOnDiet: z.boolean(),
        })
        .parse(request.body)

      await connection('meals').insert({
        id: randomUUID(),
        user_id: request.user?.id,
        name,
        description,
        date_time: dateTime,
        is_on_diet: isOnDiet,
      })

      return reply.status(201).send()
    },
  )
}
