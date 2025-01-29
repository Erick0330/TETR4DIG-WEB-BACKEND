import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @ApiProperty()
    public name: string;

    @IsString()
    @ApiProperty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @ApiProperty()
    public password: string;

    @IsString()
    @ApiProperty()
    public rol: string;
}
