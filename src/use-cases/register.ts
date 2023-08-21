import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface registerUseCaseRequest {
  nome: string
  email: string
  password: string
}

// SOLID - 5 principios da programação
// D = Dependecy Inversion Princple
//

export class RegisterUseCase {
  constructor(private UsersRepository: any) {}

  async execute({ nome, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      // return reply.status(409).send() //http

      throw new Error('Email já cadastrado')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    // this.UsersRepository / usando o repositorio passado aqui pra esse use-case
    await this.UsersRepository.create({
      nome,
      email,
      password_hash,
    })
  }
}
