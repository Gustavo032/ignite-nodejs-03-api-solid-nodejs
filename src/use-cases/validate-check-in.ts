import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins";
import { MaxDistanceError } from "./errors/max-distace-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest{
	checkInId: string
}

interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn
}

export class ValidateCheckInUseCase{
	constructor(
		private checkInsRepository: CheckInsRepository,
	){}
	
	async execute({checkInId}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{
		const checkIn = await this.checkInsRepository.findById(checkInId)

		if(!checkIn){
			throw new ResourceNotFoundError();
		}
	
		const distaceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes',
		)
		
		if(distaceInMinutesFromCheckInCreation > 20){
			throw new LateCheckInValidationError()
		}

		checkIn.validated_at = new Date();

		await this.checkInsRepository.save(checkIn)

		return {
			checkIn
		}
	}
}