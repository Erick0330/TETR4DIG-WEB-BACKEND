import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterDto {

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    rol?: string
}