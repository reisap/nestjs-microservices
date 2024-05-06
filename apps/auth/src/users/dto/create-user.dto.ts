import {IsEmail, IsString, IsStrongPassword} from "class-validator"

export class CreateUserDto {
    @IsString()
    fullname: string

    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string
}
