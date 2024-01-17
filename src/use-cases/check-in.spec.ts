import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    // principal variável que está sendo testada
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
		gymsRepository.items.push({
			id: 'gym-01', 
			title: 'gym-01', 
			description: 'test description', 
			latitude: new Decimal(-23.55452690),
			longitude: new Decimal(-47.1226331),
			phone: '123'
		})
		vi.useFakeTimers()
  })

	afterEach(() => {
		vi.useRealTimers()
	})
  it('should be able to check in', async () => {
		
		
		const { checkIn } = await sut.execute({
      gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -23.5545269,
			userLongitude: -47.1226331
    })
    
  
    expect(checkIn.id).toEqual(expect.any(String))
  })

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
      gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -23.5545269,
			userLongitude: -47.1226331
    })

  
   await expect(()=> sut.execute({
      gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0
    })
    ).rejects.toBeInstanceOf(Error)
  })
	it('should not be able to check in on distant gym', async () => {
		gymsRepository.items.push({
			id: 'gym-02', 
			title: 'gym-02', 
			description: 'test description', 
			latitude: new Decimal(-23.56425),
			longitude: new Decimal(-46.9216901),
			phone: '123'
		})
  
    await expect(()=>
			sut.execute({
				gymId: 'gym-02',
				userId: 'user-01',
				userLatitude: -23.554783,
				userLongitude: -47.054809
			})
		).rejects.toBeInstanceOf(Error)
  })
})
