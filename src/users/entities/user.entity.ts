import { ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiProperty()
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public rol: string;

}
