import {Injectable} from "@nestjs/common"
import {CreateReservationDto} from "./reservations/dto/create-reservation.dto"
import {UpdateReservationDto} from "./reservations/dto/update-reservation.dto"
import {ReservationsRepository} from "./reservations.repository"
import {string} from "joi"

@Injectable()
export class ReservationsService {
    constructor(private reservationRepository: ReservationsRepository) {}
    create(createReservationDto: CreateReservationDto) {
        // return "This action adds a new reservation"
        return this.reservationRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId: "123",
        })
    }

    findAll() {
        return this.reservationRepository.find({})
    }

    findOne(_id: string) {
        return this.reservationRepository.findone({_id})
    }

    update(_id: string, updateReservationDto: UpdateReservationDto) {
        return this.reservationRepository.findOneAndUpdate({_id}, {$set: updateReservationDto})
    }

    remove(_id: string) {
        return this.reservationRepository.findOneAndDelete({_id})
    }
}