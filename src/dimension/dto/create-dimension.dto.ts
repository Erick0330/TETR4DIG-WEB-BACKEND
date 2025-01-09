import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateDimensionDto {

    @IsString()
    public name_dimension: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public points: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public id_perspective: number;
}
