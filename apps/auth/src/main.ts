import {NestFactory} from "@nestjs/core"
import {AuthModule} from "./auth.module"
import {ConfigService} from "@nestjs/config"

async function bootstrap() {
    const app = await NestFactory.create(AuthModule)
    const configService = app.get(ConfigService)
    await app.listen(configService.get("PORT"))
}
bootstrap()
