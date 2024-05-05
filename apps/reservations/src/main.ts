import {NestFactory} from "@nestjs/core"
import {ReservationsModule} from "./reservations.module"
import * as compression from "compression"
import helmet from "helmet"
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger"

async function bootstrap() {
    const app = await NestFactory.create(ReservationsModule)
    const config = new DocumentBuilder()
        .setTitle("Reservation example")
        .setDescription("Reservation API description")
        .setVersion("1.0")
        .addTag("reservation api")
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("doc", app, document)
    app.use(compression())
    app.use(
        helmet({
            contentSecurityPolicy: false,
        }),
    )
    await app.listen(3000)
}
bootstrap()
