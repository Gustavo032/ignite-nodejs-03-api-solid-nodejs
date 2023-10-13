
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest{
	userId: string;
	password: string;
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
			throw new InvalidCredentialsError()
		}

		const doesPasswordsMatch = await compare(password, user.password_hash)

		if(!doesPasswordsMatch){
			throw new InvalidCredentialsError()
		}

		return {
			user
		}
	}
}