import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { jwtConstants } from 'src/validators/jwt.constants';

@Module({
  imports: [jwtConstants.JWTModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
