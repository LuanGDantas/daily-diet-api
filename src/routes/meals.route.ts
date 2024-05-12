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
          dateTime: z.coerce.date(),
          isOnDiet: z.boolean(),
        })
        .parse(request.body)

      await connection('meals').insert({
        id: randomUUID(),
        user_id: request.user?.id,
        name,
        description,
        date_time: dateTime.toISOString(),
        is_on_diet: isOnDiet,
      })

      return reply.status(201).send()
    },
  )

  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = z
        .object({
          id: z.string().uuid(),
        })
        .parse(request.params)

      const { name, description, dateTime, isOnDiet } = z
        .object({
          name: z.string(),
          description: z.string(),
          dateTime: z.coerce.date(),
          isOnDiet: z.boolean(),
        })
        .parse(request.body)

      const meal = await connection('meals').where({ id }).first()
      if (!meal) {
        return reply
          .status(404)
          .send({ status: 'error', message: 'Meal not found' })
      }

      await connection('meals').where({ id }).update({
        name,
        description,
        date_time: dateTime.toISOString(),
        is_on_diet: isOnDiet,
        updated_at: connection.fn.now(),
      })

      return reply.status(204).send()
    },
  )

  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = z
        .object({
          id: z.string().uuid(),
        })
        .parse(request.params)

      const meal = await connection('meals')
        .where({ id, user_id: request.user?.id })
        .first()
      if (!meal) {
        return reply
          .status(404)
          .send({ status: 'error', message: 'Meal not found' })
      }

      await connection('meals')
        .where({ id, user_id: request.user?.id })
        .delete()

      return reply.status(204).send()
    },
  )

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const meals = await connection('meals')
        .where({ user_id: request.user?.id })
        .orderBy('date_time', 'desc')

      return reply.status(200).send({ meals })
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = z
        .object({
          id: z.string().uuid(),
        })
        .parse(request.params)

      const meal = await connection('meals')
        .where({ id, user_id: request.user?.id })
        .first()
      if (!meal) {
        return reply
          .status(404)
          .send({ status: 'error', message: 'Meal not found' })
      }

      return reply.status(200).send(meal)
    },
  )

  app.get(
    '/metrics',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const meals = await connection('meals')
        .where({ user_id: request.user?.id })
        .orderBy('date_time', 'desc')

      const [{ totalMealsOnDiet }] = await connection('meals')
        .where({ user_id: request.user?.id, is_on_diet: true })
        .count('id', { as: 'totalMealsOnDiet' })

      const [{ totalMealsOffDiet }] = await connection('meals')
        .where({ user_id: request.user?.id, is_on_diet: false })
        .count('id', { as: 'totalMealsOffDiet' })

      let currentSequece = 0
      let bestOnDietSequece = 0
      for (const meal of meals) {
        if (meal.is_on_diet) {
          currentSequece += 1
        } else {
          currentSequece = 0
        }

        if (currentSequece > bestOnDietSequece) {
          bestOnDietSequece = currentSequece
        }
      }

      return reply.status(200).send({
        totalMeals: meals.length,
        totalMealsOnDiet,
        totalMealsOffDiet,
        bestOnDietSequece,
      })
    },
  )
}
