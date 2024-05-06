import {Controller, UsePipes, ValidationPipe} from "@nestjs/common"
import {PaymentsService} from "./payments.service"
import {MessagePattern, Payload} from "@nestjs/microservices"
// import {CreateChargeDto} from "@app/common"
import {PaymentsCreateChargeDto} from "./dto/payments-create-charge.dto"

@Controller("payements")
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @MessagePattern("create_charge")
    @UsePipes(new ValidationPipe())
    async createCharge(@Payload() data: PaymentsCreateChargeDto) {
        return await this.paymentsService.createCharge(data)
    }
}
