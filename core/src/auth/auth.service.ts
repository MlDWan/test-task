import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { ClientProxy } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SignInDto } from 'src/dtos/auth.dtos/signIn.dto';
import { User } from 'src/entities/user.entity';
import { SignUpDto } from 'src/dtos/auth.dtos/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('TOKEN_SERVICE') private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private usersService: UserService,
  ) {}

  async login(loginInfo: SignInDto) {
    try {
      const { email, password } = loginInfo;
      const user: User = await this.usersService.findUser({ email });
      const isMatch = await bcrypt.compare(password, user.password);

      if (user && isMatch) {
        const { id, email } = user;
        const { password, ...userInfo } = user;

        const token = await this.client
          .send('generate-token', {
            email,
            id,
          })
          .toPromise();

        return { userInfo, token };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async registrationNewUser(userData: SignUpDto) {
    try {
      const newUser = await this.usersService.createUser(userData);

      return newUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
