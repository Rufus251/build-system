import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator"

export class LoginUserDto {

    @ApiProperty()
    login: string;

    @IsString()
    @Length(6)
    @ApiProperty()
    password: string;
}