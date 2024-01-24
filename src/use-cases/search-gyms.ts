import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

// SOLID - 5 principios da programação
// D = Dependecy Inversion Princple
//

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}
export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
  query, page
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
		
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms: gyms,
    }
  }
}
