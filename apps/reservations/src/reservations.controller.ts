import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards} from "@nestjs/common"
import {ReservationsService} from "./reservations.service"
import {CreateReservationDto} from "./reservations/dto/create-reservation.dto"
import {UpdateReservationDto} from "./reservations/dto/update-reservation.dto"
import {AbstractResponse, ErrorResponse, JwtAuthGuard} from "@app/common"
import {Response} from "express"

@Controller("reservations")
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createReservationDto: CreateReservationDto, @Res() res: Response) {
        try {
            const result = await this.reservationsService.create(createReservationDto)

            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.CREATED).json(response)
        } catch (e) {
            return res.json(e)
        }
    }

    // @Get("test")
    // async testPath(@Res() response: Response) {
    //     response.json({
    //         message: "ok",
    //     })
    // }

    @Get()
    async findAll(@Res() res: Response) {
        const result = await this.reservationsService.findAll()
        console.log(result.length)

        const response = new AbstractResponse({
            code: res.statusCode,
            data: result,
            status: "Success",
        })

        return res.status(HttpStatus.OK).json(response)
    }

    @Get(":id")
    async findOne(@Param("id") id: string, @Res() res: Response) {
        try {
            const result = await this.reservationsService.findOne(id)
            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        } catch (error) {
            const response = new ErrorResponse()
            response.code = HttpStatus.NOT_FOUND
            response.message = "Not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.NOT_FOUND).json(response)
        }
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateReservationDto: UpdateReservationDto, @Res() res: Response) {
        try {
            const result = await this.reservationsService.update(id, updateReservationDto)

            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        } catch (e) {
            const response = new ErrorResponse()
            response.code = HttpStatus.NOT_FOUND
            response.message = "Not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.NOT_FOUND).json(response)
        }
    }

    @Delete(":id")
    async remove(@Param("id") id: string, @Res() res: Response) {
        try {
            const result = await this.reservationsService.remove(id)

            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        } catch (e) {
            const response = new ErrorResponse()
            response.code = HttpStatus.NOT_FOUND
            response.message = "Not found"
            response.status = "Failed"
            //return response as any
            return res.status(HttpStatus.NOT_FOUND).json(response)
        }
    }
}
