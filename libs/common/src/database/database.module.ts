import {Module} from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"
import {ModelDefinition, MongooseModule} from "@nestjs/mongoose"

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get("MONGODB_URI"),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models)
    }
}

//mongodb://admin:password@localhost:27017/db
//mongodb://[username:password@]host1[:port1]
