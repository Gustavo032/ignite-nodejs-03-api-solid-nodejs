import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
	await request.jwtVerify({
		onlyCookie: true,
	})
	// ^verifica se o token nos cookies existe e está vállido

	const { role }  = request.user
		const token = await reply.jwtSign(
			{ role },
			{
				sign: {
					sub: request.user.sub
				}
			}
		)

		const refreshToken = await reply.jwtSign(
			{ role },
			{
				sign: {
					sub: request.user.sub,
					expiresIn: "7d",
				}
			}
		)

		return reply
		.setCookie('refreshToken', refreshToken,{
			path: '/',
			secure: true, // HTTP
			sameSite: true,
			httpOnly: true
		})
		.status(200)
		.send({
			token,
		})
}
