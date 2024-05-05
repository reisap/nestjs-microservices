import {Prop, Schema} from "@nestjs/mongoose"
import {SchemaTypes, Types} from "mongoose"

@Schema()
export class AbstractDocument {
    @Prop({type: SchemaTypes.ObjectId})
    _id: Types.ObjectId
    @Prop({type: Date, default: () => Date.now(), required: false})
    create_at?
    @Prop({type: Date, default: () => Date.now(), required: false})
    update_at?
}
