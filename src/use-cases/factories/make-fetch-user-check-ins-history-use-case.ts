import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository copy"
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"

export function makeFetchUserCheckInsUseCase(){
	const checkInsRepository = new PrismaCheckInsRepository()
	const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
	
	return useCase
}	