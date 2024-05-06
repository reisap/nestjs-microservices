import {Module} from "@nestjs/common"
import {PaymentsController} from "./payments.controller"
import {PaymentsService} from "./payments.service"
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
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule {}
