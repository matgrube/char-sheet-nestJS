import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        description: 'User email',
        example: 'example@email.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User name',
        example: 'JohnDoe'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'User password',
        example: 'Redacted'
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}