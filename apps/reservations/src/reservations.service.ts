import {Injectable} from "@nestjs/common"
import {CreateReservationDto} from "./reservations/dto/create-reservation.dto"
import {UpdateReservationDto} from "./reservations/dto/update-reservation.dto"
import {ReservationsRepository} from "./reservations.repository"

@Injectable()
export class ReservationsService {
    constructor(private reservationRepository: ReservationsRepository) {}
    create(createReservationDto: CreateReservationDto, userId: string) {
        // return "This action adds a new reservation"
        return this.reservationRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId: userId,
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
