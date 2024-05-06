import {AbstractDocument} from "@app/common"
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

@Schema({versionKey: false, collection: "user"})
export class UsersDocument extends AbstractDocument {
    // @Prop({required: false})
    // username: string
    // @Prop({required: false})
    // fullname: string
    @Prop()
    email: string
    @Prop()
    password: string
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument)
