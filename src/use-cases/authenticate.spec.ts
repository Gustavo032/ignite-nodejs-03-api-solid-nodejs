import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/use-already-exists-error'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let usersRepository:InMemoryUsersRepository
let sut:AuthenticateUseCase

describe('Authenticate Use Case', () => {
	beforeEach(()=>{
		const usersRepository = new InMemoryUsersRepository()
		//principal variável que está sendo testada 
    const sut = new AuthenticateUseCase(usersRepository)
	})

	
  it('should be able to Authenticate', async () => {
		await usersRepository.create({
			nome: 'John Doe',
			email: 'John12312@doe.com',
			password_hash: await hash('123456', 6),
		})
    
		const { user } = await sut.execute({
      email: 'John12312@doe.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

	
	it('should be able to Authenticate with wrong email', async () => {
		expect(()=>sut.execute({
				email: 'John12312@doe.com',
				password: '123456',
			})).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

	it('should be able to Authenticate with wrong password', async () => {
		await usersRepository.create({
			nome: 'John Doe',
			email: 'John12312@doe.com',
			password_hash: await hash('123456', 6),
		})
    
		expect(()=>sut.execute({
				email: 'John12312@doe.com',
				password: '00',
			})).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
