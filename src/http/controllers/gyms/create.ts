import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.coerce.string(),
		latitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
  })
  // $2a$06$ZkvspiooheklSO3jydiw3ugE5xgphJ.KKZX9x08MLIpmAzkarlxXa

  const { title, description, phone, latitude, longitude } = registerBodySchema.parse(request.body)

  // throw automático no erro se essa validação falhar, nenhum código roda se falhar
	const createGymUseCase = makeCreateGymUseCase()

	await createGymUseCase.execute({
		title,
		description,
		phone,
		latitude,
		longitude 
	})
  
  return reply.status(201).send()
}
