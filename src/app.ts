import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from 'process'

export const app = fastify()

// CONTROLLERs: São as funções que lidam com os dados da requisição e devolve. Relacionada com algum frameworks.
app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
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
