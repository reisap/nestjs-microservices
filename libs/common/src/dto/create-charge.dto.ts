import {CardDto} from "./card.dto"
import {IsDefined, IsNotEmptyObject, IsNumber, ValidateNested} from "class-validator"
import {Type} from "class-transformer"

export class createChargeDto {
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto

    @IsNumber()
    amount: number
}
