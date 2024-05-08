import { FastifyReply, FastifyRequest } from 'fastify'
import { connection } from '../database'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId
  if (!sessionId) {
    return reply.status(401).send({ status: 'error', message: 'Unauthorized' })
  }

  const user = await connection('users')
    .where({ session_id: sessionId })
    .first()
  if (!user) {
    return reply.status(401).send({ status: 'error', message: 'Unauthorized' })
  }
}
