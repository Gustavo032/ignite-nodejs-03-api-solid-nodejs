import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let gymsRepository:InMemoryGymsRepository
let sut:CreateGymUseCase

describe('Create Gym Use Case', () => {
	beforeEach(()=>{
		gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
	})
	
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'John Doe',
			description: null,
			latitude: -23.5545269,
			longitude: -47.1226331,
			phone: '11971689500'
    })

    expect(gym.id).toEqual(expect.any(String))
  })

})
