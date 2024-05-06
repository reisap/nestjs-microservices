import {Controller, Get, Post, Res, UseGuards} from "@nestjs/common"
import {AuthService} from "./auth.service"
import {LocalAuthGuard} from "./guards/local-auth.guard"
import {CurrentUser} from "./current-user.decorator"
import {UsersDocument} from "./users/models/users.schema"
import {Response} from "express"
import {JwtAuthGuard} from "./guards/jwt-auth.guards"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@CurrentUser() user: UsersDocument, @Res({passthrough: true}) response: Response) {
        await this.authService.login(user, response)
        response.send(user)
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: UsersDocument) {
        return user
    }
}
