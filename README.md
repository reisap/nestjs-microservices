nest new [name apps]

//generate lib module
nest g library common

//install package mongodb
pnpm i @nestjs/mongoose mongoose

//install config for nestjs
pnpm i @nestjs/config

//install or generate spesifict module
nest g module database -p common

//install or generate config module
nest g module config -p common