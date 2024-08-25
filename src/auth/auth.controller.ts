import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { UserEntity } from "src/user/models/user.entity";
import { CreateUserDto } from "src/user/dto/create-user.dto";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: 'User Login',
        description: 'Authorizes user'
    })
    @ApiOkResponse({
        description: 'Logged in'
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials'
    })
    @Post('login')
    @HttpCode(200)
    // TODO: Switch to returning JWT
    login(@Body() body: LoginUserDto): Promise<{ token: string }> {
        return this.authService.login(body);
    }

    @ApiOperation({
        summary: 'Register User',
        description: 'Registers a new user'
    })
    @ApiCreatedResponse({
        type: UserEntity,
        description: 'Registered user object'
    })
    @ApiConflictResponse({
        description: 'Email o Username already taken'
    })
    @ApiBadRequestResponse({
        description: 'Registration failed'
    })
    @Post('register')
    @HttpCode(201)
    async register (@Body() body: CreateUserDto): Promise<UserEntity> {
        const registeredUser = await this.authService.register(body);
        return registeredUser;
    }
}