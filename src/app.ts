import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()

// CONTROLLERs: São as funções que lidam com os dados da requisição e devolve. Relacionada com algum frameworks.
app.register(appRoutes)
