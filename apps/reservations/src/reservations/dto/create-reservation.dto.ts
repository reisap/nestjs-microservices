import {Type} from "class-transformer"
import {IsDate, IsDefined, IsNotEmptyObject, ValidateNested} from "class-validator"

import {createChargeDto} from "@app/common"

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date

    @IsDate()
    @Type(() => Date)
    endDate: Date

    // @IsString()
    // @IsNotEmpty()
    // placeId: string

    // @IsString()
    // @IsNotEmpty()
    // invoiceId: string

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => createChargeDto)
    charge: createChargeDto

    // @IsDefined()
    // @IsNotEmptyObject()
    // @ValidateNested()
    // card: CardDto

    // @IsNumber()
    // amount: number
}
