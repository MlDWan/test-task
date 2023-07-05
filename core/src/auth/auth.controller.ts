import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SignInDto } from 'src/dtos/auth.dtos/signIn.dto';
import { SignUpDto } from 'src/dtos/auth.dtos/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('signIn')
  async signIn(@Body() loginInfo: SignInDto) {
    const userInfo = await this.authService.login(loginInfo);
    await this.cacheManager.set('userInfo', userInfo);

    return userInfo;
  }

  @Post('signUp')
  async signUp(@Body() userData: SignUpDto) {
    const userInfo = await this.authService.registrationNewUser(userData);
    await this.cacheManager.set('userInfo', userInfo);

    return userInfo;
  }
}
