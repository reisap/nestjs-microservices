import {Inject, Injectable} from "@nestjs/common"
import {CreateReservationDto} from "./reservations/dto/create-reservation.dto"
import {UpdateReservationDto} from "./reservations/dto/update-reservation.dto"
import {ReservationsRepository} from "./reservations.repository"
import {PAYMENTS_SERVICE, UserDto} from "@app/common"
import {ClientProxy} from "@nestjs/microservices"
import {map} from "rxjs"

@Injectable()
export class ReservationsService {
    constructor(
        private reservationRepository: ReservationsRepository,
        @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
    ) {}
    async create(createReservationDto: CreateReservationDto, {email, _id: userId}: UserDto) {
        return this.paymentService
            .send("create_charge", {
                ...createReservationDto.charge,
                email,
            })
            .pipe(
                map((res) => {
                    return this.reservationRepository.create({
                        ...createReservationDto,
                        invoiceId: res.id,
                        timestamp: new Date(),
                        userId,
                    })
                }),
            )
    }
    // async create(createReservationDto: CreateReservationDto, userId: string) {
    //     return await this.paymentService.send("create_charge", createReservationDto.charge).pipe(
    //         map(async (res) => {
    //             console.log("payment service ", res)
    //             return await this.reservationRepository.create({
    //                 ...createReservationDto,
    //                 timestamp: new Date(),
    //                 userId: userId,
    //                 invoiceId: res.id,
    //             })
    //         }),
    //     )
    // }

    async findAll() {
        return await this.reservationRepository.find({})
    }

    async findOne(_id: string) {
        return await this.reservationRepository.findone({_id})
    }

    async update(_id: string, updateReservationDto: UpdateReservationDto) {
        return await this.reservationRepository.findOneAndUpdate({_id}, {$set: updateReservationDto})
    }

    async remove(_id: string) {
        return await this.reservationRepository.findOneAndDelete({_id})
    }
}
