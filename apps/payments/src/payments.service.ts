import {Injectable, Inject} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import Stripe from "stripe"
import {PaymentsCreateChargeDto} from "./dto/payments-create-charge.dto"
import {NOTIFICATIONS_SERVICE} from "@app/common"
import {ClientProxy} from "@nestjs/microservices"

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"), {
        apiVersion: "2024-04-10",
    })

    constructor(
        private readonly configService: ConfigService,
        @Inject(NOTIFICATIONS_SERVICE)
        private readonly notificationsService: ClientProxy,
    ) {}

    async createCharge({card, amount, email}: PaymentsCreateChargeDto) {
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
        this.notificationsService.emit("notify_email", {
            email,
            text: `Your payment of $${amount} has completed successfully.`,
        })

        return paymentIntent
    }
}
