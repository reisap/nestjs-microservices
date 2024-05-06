import {NestFactory} from "@nestjs/core"
import {ReservationsModule} from "./reservations.module"
import * as compression from "compression"
import helmet from "helmet"
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger"
import {ValidationPipe} from "@nestjs/common"
import {Logger} from "nestjs-pino"
import {ConfigService} from "@nestjs/config"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
    const app = await NestFactory.create(ReservationsModule)
    if (process.env.NODE_ENV === "development") {
        const config = new DocumentBuilder()
            .setTitle("Reservation example")
            .setDescription("Reservation API description")
            .setVersion("1.0")
            .addTag("reservation api")
            .build()
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup("doc", app, document)
    }

    app.use(cookieParser())

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    )
    // app.enableCors()
    app.useLogger(app.get(Logger))
    app.use(compression())
    // app.use(
    //     helmet({
    //         contentSecurityPolicy: false,
    //     }),
    //)
    const configService = app.get(ConfigService)
    await app.listen(configService.get("PORT"))
}
bootstrap()
