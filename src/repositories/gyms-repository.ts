import { Gym } from "@prisma/client";

export interface GymsRepository {
	findByGymId(id: string): Promise<Gym | null>;
}