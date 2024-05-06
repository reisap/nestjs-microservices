import {CanActivate, ExecutionContext, Inject, Injectable, Logger} from "@nestjs/common"
import {ClientProxy} from "@nestjs/microservices"
import {AUTH_SERVICE} from "../constants/services"
import {Observable, tap, map, catchError, of} from "rxjs"
import {UserDto} from "../dto"

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly logger = new Logger(JwtAuthGuard.name)
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication
        if (!jwt) {
            return false
        }
        return this.authClient
            .send<UserDto>("authenticate", {
                Authentication: jwt,
            })
            .pipe(
                tap((res) => {
                    context.switchToHttp().getRequest().user = res
                }),
                map(() => true),
                catchError((err) => {
                    this.logger.error(err)
                    return of(false)
                }),
            )
    }
}
