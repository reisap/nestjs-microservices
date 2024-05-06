import {Module} from "@nestjs/common"
import {AuthController} from "./auth.controller"
import {AuthService} from "./auth.service"
import {UsersModule} from "./users/users.module"
import {JwtModule} from "@nestjs/jwt"
import {LoggerModule} from "@app/common"
import {ConfigService} from "@nestjs/config"
import {ConfigModule} from "@nestjs/config"
import * as Joi from "joi"
import {LocalStrategy} from "./strategies/local.strategy"

@Module({
    imports: [
        UsersModule,
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: `${configService.get("JWT_EXPIRATION")}s`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
