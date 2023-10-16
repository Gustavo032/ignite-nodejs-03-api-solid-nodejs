
import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserProfileUseCaseRequest{
	userId: string;
}

interface GetUserProfileUseCaseResponse {
	user: User
}

export class GetUserProfileUseCase{
	constructor(
		private usersRepository: UsersRepository,
	){}
	
	async execute({userId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
		//receber o ID do usuário como parametro
		const user = await this.usersRepository.findByUserId(userId)

		if(!user){
			throw new ResourceNotFoundError()
		}

		return {
			user
		}
	}
}