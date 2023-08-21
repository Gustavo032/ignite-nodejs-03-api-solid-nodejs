import { Prisma } from '@prisma/client'

export class InMemoryUsersRepository {
  public users: any[] = []
  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}

// toda ação do banco de dados vão passar por aq
