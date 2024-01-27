import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

describe('Nearby Gyms (e2e)', () => {
	beforeAll(async() => {
		await app.ready()
	})
	
	afterAll(async()=>{
		await app.close()
	})

	it('should be able to list nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		await request(app.server)
		.post('/gyms')
		.set('Authorization', `Bearer ${token}`)
		.send({
			title: "JavaScript Gym",
			description: 'some description',
			phone: '1199999999',
			latitude: -23.5184979,
			longitude: -46.8367259,
		}),

		await request(app.server)
		.post('/gyms')
		.set('Authorization', `Bearer ${token}`)
		.send({
			title: "TypeScript Gym",
			description: 'some description',
			phone: '1199999999',
			latitude: -23.5656825,
			longitude: -46.9302983,
		})

		const response = await request(app.server)
		.get('/gyms/nearby')
		.query({
			latitude: -23.5184979,
			longitude: -46.8367259,
		})
		.set('Authorization', `Bearer ${token}` )
		.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: "JavaScript Gym",
			})
		])
	})
})