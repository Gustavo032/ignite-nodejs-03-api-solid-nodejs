import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
const nearbyGymsQuerySchema = z.object({
	latitude: z.coerce.number().refine((value) => {
		return Math.abs(value) <= 90
	}),
	longitude: z.coerce.number().refine((value) => {
		return Math.abs(value) <= 180
	}),	
  })
  // $2a$06$ZkvspiooheklSO3jydiw3ugE5xgphJ.KKZX9x08MLIpmAzkarlxXa

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  // throw automático no erro se essa validação falhar, nenhum código roda se falhar
	const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

	const { gyms } = await fetchNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude
	})
  
  return reply.status(200).send({
		gyms
	})
}
