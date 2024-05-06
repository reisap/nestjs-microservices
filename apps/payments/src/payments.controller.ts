import {Controller, UsePipes, ValidationPipe} from "@nestjs/common"
import {PaymentsService} from "./payments.service"
import {MessagePattern, Payload} from "@nestjs/microservices"
import {createChargeDto} from "@app/common"

@Controller("payements")
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @MessagePattern("create_charge")
    @UsePipes(new ValidationPipe())
    async createCharge(@Payload() data: createChargeDto) {
        return await this.paymentsService.createCharge(data)
    }
}
