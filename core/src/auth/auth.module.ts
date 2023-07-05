import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisOptions } from 'ioredis';

@Module({
  imports: [
    UserModule,
    ClientsModule.register([
      {
        name: 'TOKEN_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        } as RedisOptions,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
