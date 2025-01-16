import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString } from "class-validator";


export class UpdateUserTestDto  {

    @IsNumber()
    @IsPositive()
    @Type(()=> Number)
    public id_user: number;

    @IsString()
    public ambits_result: string;

    @IsString()
    public perspectives_result: string;
    
    @IsString()
    public dimensions_result: string;
}
