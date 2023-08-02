import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface registerUseCaseRequest {
  nome: string
  email: string
  password: string
}

export async function registerUseCase({
  nome,
  email,
  password,
}: registerUseCaseRequest) {
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

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    nome,
    email,
    password_hash,
  })
}
