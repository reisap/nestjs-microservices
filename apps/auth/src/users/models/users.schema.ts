import {AbstractDocument} from "@app/common"
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

@Schema({versionKey: false, collection: "user"})
export class UsersDocument extends AbstractDocument {
    @Prop({required: true})
    username: string
    @Prop({required: true})
    fullname: string
    @Prop({required: true})
    email: string
    @Prop({required: true})
    password: string
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument)
