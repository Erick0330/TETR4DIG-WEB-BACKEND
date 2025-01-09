import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @ApiProperty()
    public name: string;

    @IsString()
    @ApiProperty()
    public email: string;

    @IsNotEmpty()
    @ApiProperty()
    public password: string;

    @IsString()
    @ApiProperty()
    public rol: string;
}
