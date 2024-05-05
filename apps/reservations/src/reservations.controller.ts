import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus} from "@nestjs/common"
import {ReservationsService} from "./reservations.service"
import {CreateReservationDto} from "./reservations/dto/create-reservation.dto"
import {UpdateReservationDto} from "./reservations/dto/update-reservation.dto"
import {AbstractResponse, ErrorResponse} from "@app/common"
import {Response} from "express"

@Controller("reservations")
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Post()
    async create(@Body() createReservationDto: CreateReservationDto, @Res() res: Response) {
        const result = await this.reservationsService.create(createReservationDto)
        if (!result) {
            const response = new ErrorResponse()
            response.code = HttpStatus.BAD_REQUEST
            response.message = "Data not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        } else {
            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.CREATED).json(response)
        }
    }

    @Get()
    async findAll(@Res() res: Response) {
        const result = await this.reservationsService.findAll()
        console.log(result.length)
        if (!result || result.length === 0) {
            const response = new ErrorResponse()
            response.code = HttpStatus.NOT_FOUND
            response.message = "Data not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.NOT_FOUND).json(response)
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
    async findOne(@Param("id") id: string, @Res() res: Response) {
        const result = await this.reservationsService.findOne(id)
        if (!result || result === null) {
            const response = new ErrorResponse()
            response.code = HttpStatus.NOT_FOUND
            response.message = "Data not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.NOT_FOUND).json(response)
        } else {
            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        }
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateReservationDto: UpdateReservationDto, @Res() res: Response) {
        const result = await this.reservationsService.update(id, updateReservationDto)
        if (!result || result === null) {
            const response = new ErrorResponse()
            response.code = HttpStatus.NOT_FOUND
            response.message = "Data not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.NOT_FOUND).json(response)
        } else {
            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        }
    }

    @Delete(":id")
    async remove(@Param("id") id: string, @Res() res: Response) {
        const result = await this.reservationsService.remove(id)
        if (!result || result === null) {
            const response = new ErrorResponse()
            response.code = HttpStatus.NOT_FOUND
            response.message = "Data not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.NOT_FOUND).json(response)
        } else {
            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        }
    }
}
