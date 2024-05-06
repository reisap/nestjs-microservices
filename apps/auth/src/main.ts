import {NestFactory} from "@nestjs/core"
import {AuthModule} from "./auth.module"
import {ConfigService} from "@nestjs/config"
import {ValidationPipe} from "@nestjs/common"
import {Logger} from "nestjs-pino"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
    const app = await NestFactory.create(AuthModule)
    app.use(cookieParser())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    )
    app.useLogger(app.get(Logger))
    const configService = app.get(ConfigService)
    await app.listen(configService.get("PORT"))
}
bootstrap()
