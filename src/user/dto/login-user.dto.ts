import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        description: 'Email',
        example: 'example@email.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password',
        example: 'Redacted'
    })
    @IsString()
    password: string;
}