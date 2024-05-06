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
