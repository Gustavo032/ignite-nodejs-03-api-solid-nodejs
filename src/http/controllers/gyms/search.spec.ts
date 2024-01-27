import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

describe('Search gyms (e2e)', () => {
	beforeAll(async() => {
		await app.ready()
	})
	
	afterAll(async()=>{
		await app.close()
	})

	it('should be able to search a gym', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		await request(app.server)
		.post('/gyms')
		.set('Authorization', `Bearer ${token}`)
		.send({
			title: "JavaScript Gym",
			description: 'some description',
			phone: '1199999999',
			latitude: -23.5545269,
			longitude: -47.1226331,
		}),

		await request(app.server)
		.post('/gyms')
		.set('Authorization', `Bearer ${token}`)
		.send({
			title: "TypeScript Gym",
			description: 'some description',
			phone: '1199999999',
			latitude: -23.5545269,
			longitude: -47.1226331,
		})

		const response = await request(app.server)
		.get('/gyms/search')
		.query({
			q: "JavaScript",
		})
		.set('Authorization', `Bearer ${token}` )
		.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'JavaScript Gym',
			})
		])
	})
})