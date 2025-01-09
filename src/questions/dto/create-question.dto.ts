import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateQuestionDto {

    @IsString()
    public question: string

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public points: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public id_dimension: number;
}
