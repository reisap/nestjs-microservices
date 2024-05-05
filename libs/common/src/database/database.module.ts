import {Module} from "@nestjs/common"
import {MongooseModule} from "@nestjs/mongoose"

@Module({
    imports: [MongooseModule.forRoot("mongodb://db:27017/sleepr")],
})
export class DatabaseModule {}

//mongodb://admin:password@localhost:27017/db
//mongodb://[username:password@]host1[:port1]
