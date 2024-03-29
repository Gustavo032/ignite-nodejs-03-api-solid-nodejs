import { FetchNeabyGymsUseCase } from "../fetch-nearby-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsUseCase(){
	const gymsRepository = new PrismaGymsRepository()
	const useCase = new FetchNeabyGymsUseCase(gymsRepository)
	
	return useCase
}	