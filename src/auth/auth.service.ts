import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserEntity } from "src/user/models/user.entity";
import { LoginUserDto } from "src/user/dto/login-user.dto";


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
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

    // TODO: Switch to returning JWT instead
    async login(dto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!this.checkPassword(dto.password, user.password)) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        return user;
    }
}