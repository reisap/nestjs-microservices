import {Module} from "@nestjs/common"
import {UsersController} from "./users.controller"
import {UsersService} from "./users.service"
import {UsersRepository} from "./users.repository"
import {DatabaseModule} from "@app/common"
import {UsersDocument, UsersSchema} from "./models/users.schema"
import {LoggerModule} from "@app/common"

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: UsersDocument.name,
                schema: UsersSchema,
            },
        ]),
        LoggerModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService],
})
export class UsersModule {}
