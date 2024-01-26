import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

describe('Check-in metrics (e2e)', () => {
	beforeAll(async() => {
		await app.ready()
	})
	
	afterAll(async()=>{
		await app.close()
	})

	it('should be able to get count of check-ins', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const user = await prisma.user.findFirstOrThrow()

		const gym = await prisma.gym.create({
			data: {
				title: 'JavaScript Gym',
				phone: '1199999999',
				latitude: -23.5545269,
				longitude: -47.1226331,
			}
		})

		await prisma.checkIn.createMany({
			data: [
				{
					gym_id: gym.id,
					user_id: user.id
				},{
					gym_id: gym.id,
					user_id: user.id
				},
			]
		})
		const response = await request(app.server)
			.get(`/check-ins/metrics`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -23.5545269,
				longitude: -47.1226331,
			})

		expect(response.statusCode).toEqual(200)
		expect(response.body.checkInsCount).toEqual(2)
	})
})