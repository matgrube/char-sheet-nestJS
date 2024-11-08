import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports: [
       forwardRef(() => UserModule) 
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule {};