import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    // principal variável que está sendo testada
    sut = new CheckInUseCase(checkInsRepository)

		vi.useFakeTimers()
  })

	afterEach(() => {
		vi.useRealTimers()
	})
  it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
      gymId: 'gym-01',
			userId: 'user-01'
    })
    
console.log(checkIn.created_at)
  
    expect(checkIn.id).toEqual(expect.any(String))
  })

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
      gymId: 'gym-01',
			userId: 'user-01'
    })

  
   await expect(()=> sut.execute({
      gymId: 'gym-01',
			userId: 'user-01'
    })
    ).rejects.toBeInstanceOf(Error)
  })
})
