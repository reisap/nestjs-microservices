import {NestFactory} from "@nestjs/core"
import {NotificationsModule} from "./notifications.module"
import {ConfigService} from "@nestjs/config"

async function bootstrap() {
    const app = await NestFactory.create(NotificationsModule)
    const configService = app.get(ConfigService)
    await app.listen(configService.get("PORT"))
}
bootstrap()
