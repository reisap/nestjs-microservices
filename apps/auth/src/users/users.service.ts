import {Injectable, UnauthorizedException} from "@nestjs/common"
import {CreateUserDto} from "./dto/create-user.dto"
import {UsersRepository} from "./users.repository"
import {UpdateUserDto} from "./dto/update-user.dto"
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}
    async create(createUserDto: CreateUserDto) {
        return await this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        })
    }
    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findone({email})
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException("Credential are not valid")
        }
        return user
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
