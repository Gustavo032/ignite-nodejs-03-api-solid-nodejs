import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository copy"
import { GetUserMetricsUseCase } from "../get-user-metrics"

export function makeGetUserMetricsUseCase(){
	const checkInsRepository = new PrismaCheckInsRepository()
	const useCase = new GetUserMetricsUseCase(checkInsRepository)
	
	return useCase
}	