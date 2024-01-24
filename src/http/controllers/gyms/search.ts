import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
const searchGymsQuerySchema = z.object({
    q: z.string(),
		page: z.coerce.number().min(1).default(1),
  })
  // $2a$06$ZkvspiooheklSO3jydiw3ugE5xgphJ.KKZX9x08MLIpmAzkarlxXa

  const { q, page } = searchGymsQuerySchema.parse(request.body)

  // throw automático no erro se essa validação falhar, nenhum código roda se falhar
	const searchGymsUseCase = makeSearchGymsUseCase()

	const { gyms } = await searchGymsUseCase.execute({
		query: q,
		page
	})
  
  return reply.status(201).send({
		gyms
	})
}
