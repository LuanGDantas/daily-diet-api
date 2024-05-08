import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { connection } from '../database'
import { encryptPassword } from '../utils/encrypt-password'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    const { name, email, password } = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
      .parse(request.body)

    const userExists = await connection('users').where({ email }).first()
    if (userExists) {
      return reply
        .status(400)
        .send({ status: 'error', message: 'User already exists' })
    }

    await connection('users').insert({
      id: randomUUID(),
      session_id: sessionId,
      name,
      email,
      password: await encryptPassword(password),
    })

    return reply.status(201).send()
  })
}
