import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from 'src/entities/user.entity';
import { UserInfoDto } from 'src/dtos/user.dtos/userInfo.dto';
import { UserDto } from 'src/dtos/user.dtos/user.dto';
import { SignUpDto } from 'src/dtos/auth.dtos/signUp.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getListUsers(): Promise<User[]> {
    const token: string = await this.cacheManager.get('token');
    const users: UserInfoDto[] = await this.userService.getAllUsers(token);
    await this.cacheManager.set('users-list', users);

    return users;
  }

  @Post()
  async createUser(@Body() userInfo: SignUpDto) {
    const user = await this.userService.createUser(userInfo);

    return user;
  }

  @Post('user')
  async findUser(@Body() userData: any): Promise<User> {
    const user = await this.userService.findUser(userData);
    await this.cacheManager.set('user', user);

    return user;
  }
}
