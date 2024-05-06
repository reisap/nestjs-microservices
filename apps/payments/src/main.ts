import {NestFactory} from "@nestjs/core"
import {PaymentsModule} from "./payments.module"
import {ConfigService} from "@nestjs/config"

async function bootstrap() {
    const app = await NestFactory.create(PaymentsModule)
    const configService = app.get(ConfigService)
    await app.listen(configService.get("PORT"))
}
bootstrap()
