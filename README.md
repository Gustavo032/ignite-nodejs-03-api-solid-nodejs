# ignite-nodejs-03-api-solid-nodejs
A Project developed in RocketSeat's NodeJS course - Ignite

Desenvolver um aplicativo que sirva para pessoa fazer check in nas academias próximas

npx prisma migrate dev // roda o arquivo schema.prisma e compara com o banco de dados se tem alterações 

npx prisma migrate deploy // roda todas as migrations no banco de dados

npx prisma studio // painel prara visualizar o banco de dados

docker compose up // rodar o docker-compose

>>> criar useCase

>>> criar repositories

>>> criar in-memory 

>>> terminar useCase

>>> criar spec.ts

Após terminar todos usecases e testar:
>> criar PrismaRepositories

>> criar factories para todos use cases

>> criar controllers

CI ==== Continuous Integration
receber codigo no repositorio e fazer verificações validações pra conseguir receber de maneira mais automatizadas atualizações do código 

code reviewers etc.

CD ==== Continuous Deployment/Delivery
quando recebermos a atualização, realizar o deploy automaticamente


# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia; 

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores; // autorização
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);