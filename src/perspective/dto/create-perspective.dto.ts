import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString } from "class-validator";
import { number } from "joi";


export class CreatePerspectiveDto {
    
    @IsNumber()
    @IsPositive()
    @Type(()=> Number)
    public id_ambit: number;

    @IsString()
    public perspective_name: string;


    @IsNumber()
    @IsPositive()
    @Type(()=> Number)
    public points: number;

}
