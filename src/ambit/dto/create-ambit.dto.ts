import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAmbitDto {

    @IsString()
    public ambit: string

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public points: number;
    
}
