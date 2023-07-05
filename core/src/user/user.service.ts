import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { Cache } from 'cache-manager';
import { UserInfoDto } from 'src/dtos/user.dtos/userInfo.dto';
import { SignUpDto } from 'src/dtos/auth.dtos/signUp.dto';
import { UserDto } from 'src/dtos/user.dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject('TOKEN_SERVICE')
    private client: ClientProxy,
  ) {}

  async getAllUsers(token: string): Promise<User[]> {
    try {
      const isToken: boolean = await this.client
        .send('validation-token', {
          token,
        })
        .toPromise();
      if (isToken) {
        const users = await this.usersRepository.find();
        return users;
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(signUpData: SignUpDto) {
    try {
      const { email, password, firstName, lastName, surname } = signUpData;
      const salt = await bcrypt.genSalt();
      const hashPass = await bcrypt.hash(password, salt);
      const user: UserDto = await this.usersRepository.findOne({
        where: { email },
      });

      if (!user) {
        const newUser = this.usersRepository.create({
          id: uuidv4(),

          email,

          password: hashPass,

          firstName,

          lastName,

          surname,
        });

        const userInfo = await this.usersRepository
          .save(newUser)
          .then(async (data) => {
            const { password, ...userInfo } = data;
            const token = await this.client
              .send('generate-token', {
                email: data.email,
                id: data.id,
              })
              .toPromise();
            return { userInfo, token };
          })
          .catch((err) => {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          });

        return userInfo;
      } else {
        throw new HttpException('The user exists', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findUser(data: any): Promise<User> {
    try {
      const user: UserInfoDto = await this.usersRepository.findOne({
        where: { ...data },
      });

      if (user) {
        return user;
      } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
