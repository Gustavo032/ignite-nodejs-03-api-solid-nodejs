import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
const checkInHistoryQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
  })
  // $2a$06$ZkvspiooheklSO3jydiw3ugE5xgphJ.KKZX9x08MLIpmAzkarlxXa

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  // throw automático no erro se essa validação falhar, nenhum código roda se falhar
	const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsUseCase()

	const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
		page, 
		userId: request.user.sub
	})
  
  return reply.status(200).send({
		checkIns
	})
}
