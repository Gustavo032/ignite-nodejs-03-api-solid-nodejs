import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface CheckInUseCaseRequest{
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn
}

export class CheckInUseCase{
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository
	){}
	
	async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
		const gym = await this.gymsRepository.findByGymId(gymId)

		if(!gym){
			throw new ResourceNotFoundError();
		}

		//calcular distancia entre usuário e academia 
		// > maior que 100m = erro 
		
		const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

		if(checkInOnSameDate){

			throw new Error()
		}
		const checkIn = await this.checkInsRepository.create({gym_id: gymId, user_id: userId});

		
		return {
			checkIn
		}
	}
}