import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/use-already-exists-error'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
	phone: string
	latitude: number
	longitude: number
}

// SOLID - 5 principios da programação
// D = Dependecy Inversion Princple
//

interface CreateGymUseCaseResponse {
  gym: Gym
}
export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
		description,
		phone,
		latitude,
		longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

    const gym = await this.gymsRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude
		})

    return {
      gym,
    }
  }
}
