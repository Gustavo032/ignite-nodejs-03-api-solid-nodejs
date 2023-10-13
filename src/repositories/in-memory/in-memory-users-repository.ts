import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { GetResult } from '@prisma/client/runtime/library'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []
	
	async findByUserId(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }


  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user1',
      nome: data.nome,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
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
