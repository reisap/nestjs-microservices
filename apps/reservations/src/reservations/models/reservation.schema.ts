import {AbstractDocument} from "@app/common"
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

@Schema({versionKey: false, collection: "Reservation"})
export class ReservationDocument extends AbstractDocument {
    @Prop()
    timestamp: Date
    @Prop()
    startDate: Date
    @Prop()
    endDate: Date
    @Prop({required: true})
    userId: string

    @Prop()
    invoiceId: string
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument)
