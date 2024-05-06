# Nest JS Microservices

## Command First Installation :

```
//create apps in nest js
> nest new [name apps]

//generate lib module
> nest g library common

//install package mongodb
> pnpm i @nestjs/mongoose mongoose

//install config for nestjs
> pnpm i @nestjs/config

//install or generate spesifict module
> nest g module database -p common

//install or generate config module
> nest g module config -p common

//create microservices
> nest g app reservations

//create transport layer in microservices
> nest g resource reservations

//create global logger
> nest g module logger -p common

```

## Part 2 Microservices Auth

```
//create new app for microservice
> nest g app auth

//create new module users
> nest g module users

//create controller user
> nest g controller users

//create services user
> nest g service users

//update npm for password using passport
> pnpm i -S @nestjs/passport passport passport-local
> pnpm i -D @types/passport-local

//jwt auth
> pnpm i -S @nestjs/jwt passport-jwt
> pnpm i -D @types/passport-jwt

//hash password
> pnpm i -S bcrypt
> pnpm i -D @types/bcrypt
> pnpm i -S bcryptjs express
> pnpm i -D @types/bcryptjs @types/express

```
