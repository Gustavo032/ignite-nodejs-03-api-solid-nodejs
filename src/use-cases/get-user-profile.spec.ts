import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetUserProfileUseCase } from './get-user-profile'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // principal variável que está sendo testada
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
		const createdUser = await usersRepository.create({	
      nome: 'John Doe',
      email: 'John12312@doe.com',
      password_hash: await hash('123456', 6)
    })

		const {user} = await sut.execute({ userId: createdUser.id })
   
		expect(user.id).toEqual(expect.any(String))
		expect(user.nome).toEqual("John Doe")
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id"
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })


})
