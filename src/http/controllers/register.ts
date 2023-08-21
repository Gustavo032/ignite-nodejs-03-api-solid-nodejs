import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  // $2a$06$ZkvspiooheklSO3jydiw3ugE5xgphJ.KKZX9x08MLIpmAzkarlxXa

  const { email, password } = registerBodySchema.parse(request.body)
  const nome = registerBodySchema.parse(request.body).name

  // throw automático no erro se essa validação falhar, nenhum código roda se falhar
  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    await registerUseCase.execute({ nome, email, password })
  } catch (e) {
    console.log(e)
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
