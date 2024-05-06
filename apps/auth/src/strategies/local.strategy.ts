import {Injectable, UnauthorizedException} from "@nestjs/common"
import {PassportStrategy} from "@nestjs/passport"
import {UsersService} from "../users/users.service"
import {Strategy} from "passport-local"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            usernameField: "email",
        })
    }

    async validate(email: string, password: string) {
        try {
            return this.userService.verifyUser(email, password)
        } catch (e) {
            throw new UnauthorizedException(e)
        }
    }
}
