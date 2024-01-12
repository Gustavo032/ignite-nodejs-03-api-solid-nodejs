import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import { GetResult } from '@prisma/client/runtime/library'

export class InMemoryCheckInsRepository implements CheckInsRepository {	
	public items: CheckIn[] = []
	
	async findByUserIdOnDate(userId: string, date: Date) {
		const checkInOnSameDate = this.items.find(
			(checkIn ) => checkIn.user_id === userId,
		)

		if(!checkInOnSameDate){
			return null
		}
		
		return checkInOnSameDate
	}
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at? new Date(data.validated_at) : null,
			created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}

// {
// 	async findByEmail(email) {
// 		return null
// 	},

// 	async create(data) {
// 		return {
// 			id: 'user1',
// 			nome: data.nome,
// 			email: data.email,
// 			password_hash: data.password_hash,
// 			created_at: new Date(),
// 		}
// 	},
// }
