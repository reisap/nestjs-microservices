import {Injectable} from "@nestjs/common"
import {CreateUserDto} from "./dto/create-user.dto"
import {UsersRepository} from "./users.repository"
import {UpdateUserDto} from "./dto/update-user.dto"

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}
    async create(createUserDto: CreateUserDto) {
        return await this.usersRepository.create({
            ...createUserDto,
        })
    }
    findAll() {
        return this.usersRepository.find({})
    }

    findOne(_id: string) {
        return this.usersRepository.findone({_id})
    }

    update(_id: string, updateUserDto: UpdateUserDto) {
        return this.usersRepository.findOneAndUpdate({_id}, {$set: updateUserDto})
    }

    remove(_id: string) {
        return this.usersRepository.findOneAndDelete({_id})
    }
}
