import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, HttpStatus} from "@nestjs/common"
import {ReservationsService} from "./reservations.service"
import {CreateReservationDto} from "./reservations/dto/create-reservation.dto"
import {UpdateReservationDto} from "./reservations/dto/update-reservation.dto"
import {AbstractResponse, ErrorResponse} from "@app/common"
import {Response} from "express"

@Controller("reservations")
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Post()
    create(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationsService.create(createReservationDto)
    }

    @Get()
    async findAll(@Res() res: Response) {
        const result = await this.reservationsService.findAll()
        console.log(result.length)
        if (!result || result.length === 0) {
            const response = new ErrorResponse()
            response.code = HttpStatus.OK
            response.message = "Data not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.OK).json(response)
        } else {
            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        }
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
