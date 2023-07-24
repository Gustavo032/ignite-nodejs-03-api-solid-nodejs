import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
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
}
