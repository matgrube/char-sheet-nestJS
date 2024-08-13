import {
    Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from './models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get All Users',
    description: 'Returns a list of all users',
  })
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'List of registered users',
  })
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  };

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates new user'
  })
  @ApiConflictResponse({
    description: 'Email or username is already taken'
  })
  async createUser(
    @Body() body: CreateUserDto
  ): Promise<UserEntity> {
    return await this.userService.createUsers(body);
  }
}
