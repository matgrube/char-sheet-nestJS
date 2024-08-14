import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { bcrypt } from "bcrypt";


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
}