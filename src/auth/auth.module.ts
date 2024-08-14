import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";


@Module({
    imports: [
       forwardRef(() => UserModule) 
    ]
})
export class AuthModule {};