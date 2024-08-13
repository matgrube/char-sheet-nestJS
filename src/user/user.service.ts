import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./models/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async createUsers(dto: CreateUserDto): Promise<UserEntity> {
        const {...userDetails} = dto;
        try {
            const newUser = this.userRepository.create(userDetails);
            await this.userRepository.save(newUser);
            return newUser;
        } catch (error) {
            console.error(error);
        }
    }
}