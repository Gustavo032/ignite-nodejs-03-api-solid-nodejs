import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

// CONTROLLERs: São as funções que lidam com os dados da requisição e devolve. Relacionada com algum frameworks.
app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Fazer um log para uma ferramenta de usabilidade pra tipo Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'internal server error' })
})
