import {Module} from "@nestjs/common"
import {NotificationsController} from "./notifications.controller"
import {NotificationsService} from "./notifications.service"
import * as Joi from "joi"
import {ConfigModule} from "@nestjs/config"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
            }),
        }),
    ],
    controllers: [NotificationsController],
    providers: [NotificationsService],
})
export class NotificationsModule {}
