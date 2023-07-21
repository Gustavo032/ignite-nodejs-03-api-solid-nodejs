import { prisma } from './lib/prisma'
import fastify from 'fastify'
import { z } from 'zod'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)
  // throw automático no erro se essa validação falhar, nenhum código roda se falhar

  await prisma.user.create({
    data: {
      nome: name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
})
