import {Controller, Get, Post, Body, Patch, Param, Delete} from "@nestjs/common"
import {ReservationsService} from "./reservations.service"
import {CreateReservationDto} from "./reservations/dto/create-reservation.dto"
import {UpdateReservationDto} from "./reservations/dto/update-reservation.dto"
import {AbstractResponse, ErrorResponse} from "@app/common"

@Controller("reservations")
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Post()
    create(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationsService.create(createReservationDto)
    }

    @Get()
    async findAll(): Promise<AbstractResponse> {
        const result = await this.reservationsService.findAll()
        if (!result) {
            const response = new ErrorResponse()
            response.code = 200
            response.message = "Data not found"
            response.status = "Failed"
            return response as any
        }
        const response = new AbstractResponse()
        response.code = 200
        response.data = result
        response.status = "Success"

        return response as any
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.reservationsService.findOne(id)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateReservationDto: UpdateReservationDto) {
        return this.reservationsService.update(id, updateReservationDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.reservationsService.remove(id)
    }
}
