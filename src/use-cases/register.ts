import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  password: string
}

// SOLID - 5 principios da programação
// D = Dependecy Inversion Princple
//

interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    nome,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      // return reply.status(409).send() //http

      throw new UserAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    // this.UsersRepository / using the repository passed here for this use case
    const user = await this.usersRepository.create({
      nome,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
