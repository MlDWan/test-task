import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisOptions } from 'ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
