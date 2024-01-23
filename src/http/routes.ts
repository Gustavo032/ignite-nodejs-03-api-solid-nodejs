import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
	app.post('/sessions', authenticate)
	
	// Authenticated routes
	app.get('/me', profile)
}

// Basic Auth: todas as rotas precisam ser enviadas com a senha e e-mail no cabeçalho 
// base64 - no header - NAO SEGURO

/// JWT - Jsonwebtoken - Token
// faz login - enviando email e senha - server cria um token unico e não modificavel STATELESS
// Stateless: não armazenado em nenhuma estrutura de persistencia de getDistanceBetweenCoordinates(banco de dados)
// back end: usa uma palavra chave para criar o token

// palavra chave: qualquercois41234

// email/senha reais? = criar hash usando palavra-chave para posterior decode  

// header.payload.signature
// header = algorithm: hs256
// payload = informação (tipo o body da requisição)
// sub é comumente usado para passar o "id" do usuário

// signature é pra garantir a veracidade do jwt

// Bearer JWT == usado para fazer authorizações com jwt