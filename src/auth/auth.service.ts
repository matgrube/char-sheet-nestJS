import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserEntity } from "src/user/models/user.entity";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt-payload";


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    };

    private async checkPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, hashedPassword);
    };

    async register(dto: CreateUserDto): Promise<UserEntity> {
        dto.password = await this.hashPassword(dto.password);
        return await this.userService.createUsers(dto);
    };

    async login(dto: LoginUserDto): Promise<{token: string}> {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!this.checkPassword(dto.password, user.password)) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        const payload: JwtPayload = {
            iss: 'sol-charsheet',
            context: {
                user: {
                    userId: user.id,
                    displayName: user.name
                }
            }
        }
        return {
            token: await this.jwtService.signAsync(payload)
        };
    }
}