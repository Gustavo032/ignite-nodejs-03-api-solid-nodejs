import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

describe('Create Gym (e2e)', () => {
	beforeAll(async() => {
		await app.ready()
	})
	
	afterAll(async()=>{
		await app.close()
	})

	it('should be able to create a gym', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		const response = await request(app.server)
		.post('/gyms')
		.set('Authorization', `Bearer ${token}`)
		.send({
			title: 'JavaScript Gym',
			description: 'some description',	
			phone: '1199999999',
			latitude: -23.5545269,
			longitude: -47.1226331,
		})

		expect(response.statusCode).toEqual(201)
	})
})