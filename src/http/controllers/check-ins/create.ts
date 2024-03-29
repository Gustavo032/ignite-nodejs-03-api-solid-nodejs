import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createCheckInParamsSchema = z.object({
		gymId: z.string().uuid(),
	})

  const createCheckInBodySchema = z.object({
		latitude: z.coerce.number().refine(value => {
			return Math.abs(value) <= 90
		}),
		longitude: z.coerce.number().refine(value => {
			return Math.abs(value) <= 180
		})
  })
  // $2a$06$ZkvspiooheklSO3jydiw3ugE5xgphJ.KKZX9x08MLIpmAzkarlxXa

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  // throw automático no erro se essa validação falhar, nenhum código roda se falhar
	const checkInUseCase = makeCheckInUseCase()

	await checkInUseCase.execute({
		gymId,
		userId: request.user.sub,
		userLatitude: latitude,
		userLongitude: longitude
	})
  return reply.status(201).send()
}
