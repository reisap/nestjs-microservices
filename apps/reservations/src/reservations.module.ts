import {Module} from "@nestjs/common"
import {ReservationsService} from "./reservations.service"
import {ReservationsController} from "./reservations.controller"
import {DatabaseModule} from "@app/common"
import {ReservationsRepository} from "./reservations.repository"
import {ReservationDocument, ReservationSchema} from "./reservations/models/reservation.schema"
import {LoggerModule} from "@app/common"
import {ConfigModule} from "@nestjs/config"
import * as Joi from "joi"

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: ReservationDocument.name,
                schema: ReservationSchema,
            },
        ]),
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
        }),
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
