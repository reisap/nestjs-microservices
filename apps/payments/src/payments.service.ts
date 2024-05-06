import {Injectable} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import Stripe from "stripe"
import {PaymentsCreateChargeDto} from "./dto/payments-create-charge.dto"
// import {NOTIFICATIONS_SERVICE} from "@app/common"
// import {ClientProxy} from "@nestjs/microservices"

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(
        "sk_test_51PDSNrRt43KF6KMqKblHhtcn87HLDR8zx6kaVcme1x3N74F8LUOugp2PW17rw0Jopvt9YTQhT3jBJJYZHnyGeqfv00XBvO2JU4",
        {
            apiVersion: "2024-04-10",
            typescript: true,
        },
    )

    constructor(private readonly configService: ConfigService) {}

    async createCharge({card, amount}: PaymentsCreateChargeDto) {
        const paymentMethod = await this.stripe.paymentMethods.create({
            type: "card",
            card,
        })

        const paymentIntent = await this.stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            amount: amount * 100,
            confirm: true,
            payment_method_types: ["card"],
            currency: "usd",
        })
        // this.notificationsService.emit("notify_email", {
        //     email,
        //     text: `Your payment of $${amount} has completed successfully.`,
        // })

        return paymentIntent
    }
}
