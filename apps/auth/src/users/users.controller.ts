import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus} from "@nestjs/common"
import {CreateUserDto} from "./dto/create-user.dto"
import {UsersService} from "./users.service"
import {AbstractResponse, ErrorResponse} from "@app/common"
import {Response} from "express"
import {UpdateUserDto} from "./dto/update-user.dto"

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const result = await this.userService.create(createUserDto)
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

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const result = await this.userService.findAll()
            console.log(result.length)

            const response = new AbstractResponse({
                code: res.statusCode,
                data: result,
                status: "Success",
            })

            return res.status(HttpStatus.OK).json(response)
        } catch (e) {
            return res.json(e)
        }
    }

    @Get(":id")
    async findOne(@Param("id") id: string, @Res() res: Response) {
        try {
            const result = await this.userService.findOne(id)
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
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
        try {
            const result = await this.userService.update(id, updateUserDto)

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
            const result = await this.userService.remove(id)

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
