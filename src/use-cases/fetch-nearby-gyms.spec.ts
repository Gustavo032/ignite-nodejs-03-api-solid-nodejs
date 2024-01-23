import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchNeabyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNeabyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach( async () => {
    gymsRepository = new InMemoryGymsRepository()
    // principal variável que está sendo testada
    sut = new FetchNeabyGymsUseCase(gymsRepository)

  })

  it('should be able to fetch nearby gyms', async () => {
		
		await gymsRepository.create({
			title: 'Near Gym',
			description: null,
			latitude: -23.5184979,
			longitude: -46.8367259,
			phone: '11971689500'
		})
		
		await gymsRepository.create({
			title: 'Far Gym',
			description: null,
			latitude: -23.5656825,
			longitude: -46.9302983,
			phone: '11971689500'
		})
		
		const { gyms } = await sut.execute({
			userLatitude: -23.5184979,
			userLongitude: -46.8367259
    })
    
  
    expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Near Gym'}),
		])
  })
})