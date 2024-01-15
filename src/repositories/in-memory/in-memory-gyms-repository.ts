import { Prisma, Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { GetResult } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
	public items: Gym[] = []
	
	async findByGymId(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym	
  }
}
